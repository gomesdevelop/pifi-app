import api from "@/lib/axios";

const url = `${process.env.NEXT_PUBLIC_API_URL}/transactions`;

type TransactionUpdateDTO = { id: string; data: Transaction };

export const fetchTransaction = (id: string) =>
  api.get<Transaction>(`${url}/${id}`).then((res) => res.data);

export const fetchTransactions = () =>
  api.get<Transaction[]>(url).then((res) => res.data);

export const createTransaction = (data: Transaction) =>
  api.post<Transaction>(`${url}`, data);

export const updateTransaction = ({ id, data }: TransactionUpdateDTO) =>
  api.put<Transaction>(`${url}/${id}`, data);

export const deleteTransaction = (id: string) =>
  api.delete<Transaction>(`${url}/${id}`);
