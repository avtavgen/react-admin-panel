const users = [
  {
    id: '0199ad6a-ccb0-7a39-93d4-5d37cc7b192d',
    name: 'User',
    email: 'user@test-site.com',
    password: 'Test123',
  },
];

const customers = [
  {
    id: '0199ad6a-ccb0-76b8-a7a2-7cc832c1175a',
    name: 'Jon Doe',
    email: 'j.doe@test.com',
    image_url: '/customers/jon-doe.png',
  },
  {
    id: '0199ad6a-ccb0-7007-9cd5-a52dcb90e7d1',
    name: 'Ana Freisen',
    email: 'freisen-ana@test.com',
    image_url: '/customers/ana-freisen.png',
  },
  {
    id: '0199ad6a-ccb0-77b7-a880-0adda1e01a1c',
    name: 'Chuck Pallanik',
    email: 'chuck11234@google.com',
    image_url: '/customers/chuck-pallanik.png',
  },
  {
    id: '0199ad6a-ccb0-7bce-bce5-27b3b8e28a03',
    name: 'Wes Andersen',
    email: 'wander@outlook.com',
    image_url: '/customers/wes-andersen.png',
  },
  {
    id: '0199ad6a-ccb0-710f-8655-b5fe738c7282',
    name: 'Hunter Thompson',
    email: 'gonzo@mail.ru',
    image_url: '/customers/hunter-thompson.png',
  },
  {
    id: '0199ad6a-ccb0-7a7f-965e-ca036e8abf88',
    name: 'Leo Dicaprio',
    email: 'leo-di@google.com',
    image_url: '/customers/leo-dicaprio.png',
  },
];

const invoices = [
  {
    customer_id: customers[0].id,
    amount: 15795,
    status: 'pending',
    date: '2025-10-04',
  },
  {
    customer_id: customers[1].id,
    amount: 20348,
    status: 'pending',
    date: '2025-09-14',
  },
  {
    customer_id: customers[4].id,
    amount: 3040,
    status: 'paid',
    date: '2025-09-27',
  },
  {
    customer_id: customers[3].id,
    amount: 44800,
    status: 'paid',
    date: '2025-08-12',
  },
  {
    customer_id: customers[5].id,
    amount: 34577,
    status: 'pending',
    date: '2025-08-05',
  },
  {
    customer_id: customers[2].id,
    amount: 54246,
    status: 'pending',
    date: '2025-06-25',
  },
  {
    customer_id: customers[0].id,
    amount: 666,
    status: 'pending',
    date: '2025-05-16',
  },
  {
    customer_id: customers[3].id,
    amount: 32545,
    status: 'paid',
    date: '2025-06-09',
  },
  {
    customer_id: customers[4].id,
    amount: 1250,
    status: 'paid',
    date: '2025-05-08',
  },
  {
    customer_id: customers[5].id,
    amount: 8546,
    status: 'paid',
    date: '2025-04-23',
  },
  {
    customer_id: customers[1].id,
    amount: 500,
    status: 'paid',
    date: '2025-07-03',
  },
  {
    customer_id: customers[5].id,
    amount: 8945,
    status: 'paid',
    date: '2025-04-08',
  },
  {
    customer_id: customers[2].id,
    amount: 1000,
    status: 'paid',
    date: '2025-05-21',
  },
];

const revenue = [
  { month: 'Jan', revenue: 2000 },
  { month: 'Feb', revenue: 1800 },
  { month: 'Mar', revenue: 2200 },
  { month: 'Apr', revenue: 2500 },
  { month: 'May', revenue: 2300 },
  { month: 'Jun', revenue: 3200 },
  { month: 'Jul', revenue: 3500 },
  { month: 'Aug', revenue: 3700 },
  { month: 'Sep', revenue: 2500 },
  { month: 'Oct', revenue: 2800 },
  { month: 'Nov', revenue: 3000 },
  { month: 'Dec', revenue: 4800 },
];

export { users, customers, invoices, revenue };