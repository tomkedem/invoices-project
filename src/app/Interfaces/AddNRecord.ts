export  interface AddNRecord {
    id: number;
    name: string;
    date: string;
    // Add all other properties as per your requirement
    
    status: string;
    amount: number;
    customerId: string | number;  // Accept both string and number
    customer: {
      customerId: number;
      name: string;
      identityCard: string;
    };
  }
  