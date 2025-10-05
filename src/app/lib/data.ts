import {
    Customer,
    CustomersTableType, Invoice,
    InvoicesTable, LatestInvoice,
    Revenue,
} from './definitions';
import { formatCurrency } from './utils';
import {customers, invoices, revenue} from "@/app/lib/placeholder-data";
import {notFound} from "next/navigation";

export async function fetchRevenue(): Promise<Revenue[]> {
  try {
    console.log('Fetching revenue data...');
    await new Promise((resolve) => setTimeout(resolve, 2000));

    return revenue;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch revenue data.');
  }
}

export async function fetchLatestInvoices(): Promise<LatestInvoice[]> {
  try {
    // Build a customer lookup map
    const customerMap = Object.fromEntries(customers.map(c => [c.id, c]));

    return invoices.map(inv => {
      const customer = customerMap[inv.customer_id];
      return {
        id: customer.id,
        name: customer.name,
        email: customer.email,
        image_url: customer.image_url,
        amount: inv.amount.toString()
      } as LatestInvoice;
    })
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch the latest invoices.');
  }
}

export async function fetchCardData() {
  try {
    // You can probably combine these into a single SQL query
    // However, we are intentionally splitting them to demonstrate
    // how to initialize multiple queries in parallel with JS.
    const invoiceCountPromise: number = 0;
    const customerCountPromise: number = 0;
    const invoiceStatusPromise: number = 0;

    // const data = await Promise.all([
    //   invoiceCountPromise,
    //   customerCountPromise,
    //   invoiceStatusPromise,
    // ]);

    const numberOfInvoices: number = 13; //Number(data[0].count ?? '0');
    const numberOfCustomers: number = 6; //Number(data[1].count ?? '0');
    const totalPaidInvoices: number = 8; //formatCurrency(data[2][0].paid ?? '0');
    const totalPendingInvoices: number = 5; //formatCurrency(data[2][0].pending ?? '0');

    return {
      numberOfCustomers,
      numberOfInvoices,
      totalPaidInvoices,
      totalPendingInvoices,
    };
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch card data.');
  }
}

const ITEMS_PER_PAGE = 6;
export async function fetchFilteredInvoices(
    query: string,
    currentPage: number,
  ): Promise<InvoicesTable[]> {

  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    // Build a customer lookup map
    const customerMap = Object.fromEntries(customers.map(c => [c.id, c]));

    const query_set: InvoicesTable[] = invoices.map(inv => {
      const customer = customerMap[inv.customer_id];
      if (!customer) return null;
        return {
          id: customer.id,
          customer_id: customer.id,
          name: customer.name,
          email: customer.email,
          image_url: customer.image_url,
          date: inv.date,
          amount: inv.amount,
          status: inv.status,
        } as InvoicesTable;
      }).filter(
       (inv): inv is InvoicesTable =>
          inv !== null &&
          Object.values(inv).some(
            val => String(val).toLowerCase().includes(query.toLowerCase()),
          )
      );

    return query_set.slice(offset, offset + ITEMS_PER_PAGE);
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch invoices.');
  }
}

export async function fetchInvoicesPages(query: string): Promise<number> {
  try {
    const data = invoices.filter(invoice =>
      Object.values(invoice).some(value => String(value) === query)
    );

    return Math.ceil(Number(data.length) / ITEMS_PER_PAGE);
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of invoices.');
  }
}

export async function fetchInvoiceById(id: string): Promise<Invoice | undefined> {
  try {
    const invoice = invoices.find(
          inv => inv.customer_id === id);

    if (!invoice) {
      return notFound();
    }

    return {
      ...invoice,
      id: id,
      status: invoice.status as "pending" | "paid",
    }
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch invoice.');
  }
}

export async function fetchCustomers(): Promise<Customer[]> {
  try {
    return customers;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all customers.');
  }
}


export async function fetchFilteredCustomers(query: string) {
  try {
    const invoiceMap = invoices.reduce<Record<string, {
        total_invoices: number; total_pending: number; total_paid: number
    }>>((
        acc, invoice) => {
    if (!acc[invoice.customer_id]) {
      acc[invoice.customer_id] = { total_invoices: 0, total_pending: 0, total_paid: 0 };
    }
    acc[invoice.customer_id].total_invoices += 1;
    if (invoice.status === 'pending') acc[invoice.customer_id].total_pending += 1;
    if (invoice.status === 'paid') acc[invoice.customer_id].total_paid += 1;
    return acc;
  }, {});

    const initial_queryset = customers.filter(customer =>
    Object.values(customer).some(value =>
      String(value).toLowerCase().includes(query.toLowerCase())
    )
  );

    const filtered_queryset: CustomersTableType[] = initial_queryset.map(customer => {
      const totals = invoiceMap[customer.id] || { total_invoices: 0, total_pending: 0, total_paid: 0 };
    return {
      ...customer,
      ...totals,
    };
  });

    return filtered_queryset.map((customer) => ({
      ...customer,
      total_pending: formatCurrency(customer.total_pending),
      total_paid: formatCurrency(customer.total_paid),
    }));
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch customer table.');
  }
}