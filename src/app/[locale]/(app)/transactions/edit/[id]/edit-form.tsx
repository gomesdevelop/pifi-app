"use client";

import TransactionForm, { Input } from "@/components/transactions/form";
import { useToast } from "@/components/ui/use-toast";
import { fetchTransaction, updateTransaction } from "@/services/transaction";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import React from "react";

const TransactionEditForm: React.FC = () => {
  const queryClient = useQueryClient();
  const params = useParams<{ id: string }>();
  const t = useTranslations("Transaction");
  const { toast } = useToast();

  const { mutate, isSuccess } = useMutation({
    mutationFn: updateTransaction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
    },
  });

  const onSubmitForm = async (data: Input): Promise<void> => {
    return new Promise((resolve, reject) => {
      mutate(
        { id: params.id, data: data as Transaction },
        {
          onSuccess: () => resolve(),
          onError: () => reject(),
        }
      );
    });
  };

  // Queries
  const { data, isLoading, isError } = useQuery({
    queryKey: ["transactions", params.id],
    queryFn: () => fetchTransaction(params.id),
  });

  if (isLoading) return <div>Loading...</div>;

  return (
    <TransactionForm
      title={t("update")}
      isLoading={isLoading}
      isError={isError}
      defaultValues={data}
      onSubmitForm={onSubmitForm}
    />
  );
};

export default TransactionEditForm;
