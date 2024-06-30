"use client";

import ButtonActions from "@/components/button-actions";
import { Modal } from "@/components/modal";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useRouter } from "@/navigation";
import { deleteTransaction, fetchTransaction } from "@/services/transaction";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import React from "react";

const TransactionDeleteForm: React.FC = () => {
  const t = useTranslations("Transaction");
  const queryClient = useQueryClient();
  const params = useParams<{ id: string }>();
  const router = useRouter();

  const { mutate, isSuccess } = useMutation({
    mutationFn: deleteTransaction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
    },
  });

  const onSubmit = () => {
    mutate(params.id);
    router.back();
  };

  // Queries
  const { data, isLoading } = useQuery({
    queryKey: ["transactions", params.id],
    queryFn: () => fetchTransaction(params.id),
  });

  if (isLoading) return <div>Loading...</div>;

  return (
    <Modal>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{t("delete")}</DialogTitle>
          <DialogDescription>
            {t("messages.confirm-delete", {
              name: ` ${data ? data?.description : ""}`,
            })}

            {" " + t("messages.undone-operation")}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <ButtonActions onConfirm={onSubmit} onCancel={() => router.back()} />
        </DialogFooter>
      </DialogContent>
    </Modal>
  );
};

export default TransactionDeleteForm;
