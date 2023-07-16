export class Invoice {
  id: number;
    date: string;
    status: string;
    amount: number;
    customerId: number;
    customer: {
      customerId: number;
      name: string;
      identityCard: string;
    };
  }
  