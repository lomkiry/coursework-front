export interface Transaction {
    id: string;
    type: 'income' | 'expense';
    amount: number;
    date: Date;
    description: string;
    categoryId: string;
}