"use client";

import TransactionForm, { Input } from "@/components/transactions/form";
import { createTransaction } from "@/services/transaction";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import React from "react";

const TransactionCreateForm: React.FC = () => {
  const queryClient = useQueryClient();
  const t = useTranslations("Transaction");

  const { mutate, isSuccess, isError } = useMutation({
    mutationFn: createTransaction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
    },
  });

  const onSubmitForm = async (data: Input): Promise<void> => {
    return new Promise((resolve, reject) => {
      mutate(data as Transaction, {
        onSuccess: () => resolve(),
        onError: () => reject(),
      });
    });
  };

  return <TransactionForm title={t("create")} onSubmitForm={onSubmitForm} />;
};

export default TransactionCreateForm;
