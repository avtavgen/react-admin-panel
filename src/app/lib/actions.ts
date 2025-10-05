'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import {notFound, redirect} from 'next/navigation';
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
import { invoices } from "@/app/lib/placeholder-data";


function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function db_call(): Promise<void> {
  console.log('Imitating db call ');
  await sleep(2000);
}

const FormSchema = z.object({
  id: z.string(),
  customer_id: z.string().min(1, {error: 'Please select a customer.'}),
  amount: z.coerce
    .number()
    .gt(0, {error: 'Please enter an amount greater than $0.'}),
  status: z.enum(['pending', 'paid'], {error: 'Please select an invoice status.'}),
  date: z.string(),
});

const CreateInvoice = FormSchema.omit({ id: true, date: true });
const UpdateInvoice = FormSchema.omit({ date: true, id: true });

export type State = {
  errors?: any | null;
  message?: string | null;
};

export async function createInvoice(prevState: State, formData: FormData) {
  // Validate form fields using Zod
  const validatedFields = CreateInvoice.safeParse({
    customer_id: formData.get('customer_id'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: z.flattenError(validatedFields.error).fieldErrors,
      message: 'Missing Fields. Failed to Create Invoice.',
    };
  }

  // Prepare data for insertion into the database
  const { customer_id, amount, status } = validatedFields.data;
  const amountInCents = amount * 100;
  const date = new Date().toISOString().split('T')[0];

  // Insert data into the database
  try {
    invoices.push({
        customer_id: customer_id,
        amount: amountInCents,
        status: status,
        date: date
    })
  } catch (error) {
    return {message: 'Database Error: Failed to Add Invoice.' };
  }

  // Revalidate the cache for the invoices page and redirect the user.
  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
}

export async function updateInvoice(
    id: string,
    prevState: State,
    formData: FormData,
  ) {
  const validatedFields = UpdateInvoice.safeParse({
    customer_id: formData.get('customer_id'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });

  if (!validatedFields.success) {
    return {
      errors: z.flattenError(validatedFields.error).fieldErrors,
      message: 'Missing Fields. Failed to Update Invoice.',
    };
  }

  const { customer_id, amount, status } = validatedFields.data;
  const amountInCents = amount * 100;
  const date = new Date().toISOString().split('T')[0];

  try {
    const invoice = invoices.find(
        inv => inv.customer_id === customer_id);

    if (!invoice) {
      return notFound();
    }

    // Merge updated fields into existing invoice
    Object.assign(invoice, {
        customer_id: customer_id,
        amount: amountInCents,
        status: status,
        date: date
    });
  } catch (error) {
    return {message: 'Database Error: Failed to Update Invoice.' };
  }

  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
}

export async function deleteInvoice(id: string) {
  const index = invoices.findIndex(
    inv => inv.customer_id === id);

  if (index === -1) {
    return notFound();
  }

  try {
    invoices.splice(index, 1);
  } catch (error) {
    return {message: 'Database Error: Failed to Delete Invoice.' };
  }

  revalidatePath('/dashboard/invoices');
}

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}