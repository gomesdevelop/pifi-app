"use client";

import React from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Input } from "../ui/input";
import { useRouter } from "@/navigation";
import ButtonActions from "../button-actions";
import { useTranslations } from "next-intl";

const formSchema = z.object({
  description: z.string(),
  dueDate: z.string(),
  amount: z.coerce.number(),
  transactionType: z.number(),
});

export type Input = z.infer<typeof formSchema>;

interface TransactionFormProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  title?: string;
  defaultValues?: Input;
  isLoading?: boolean;
  isError?: boolean;
  onSubmitForm?: (data: Input) => Promise<void>;
}

const TransactionForm: React.FC<TransactionFormProps> = ({
  title,
  defaultValues,
  isLoading,
  isError,
  onSubmitForm,
  ...rest
}) => {
  const router = useRouter();
  const t = useTranslations("Transaction");

  const form = useForm<Input>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const onHandleSubmit = async (values: Input) => {
    onSubmitForm && onSubmitForm(values).then(() => router.back());
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onHandleSubmit)}
        className="h-full flex flex-col justify-between"
      >
        <div {...rest} className="h-full">
          <div className="text-lg font-semibold mb-8">{title}</div>
          {isLoading ? (
            <div className="h-full flex items-center justify-center">
              Loading...
            </div>
          ) : isError ? (
            <div className="h-full flex items-center justify-center">
              Something went wrong
            </div>
          ) : (
            <div className="grid gap-4">
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("description")}</FormLabel>
                    <FormControl>
                      <Input placeholder={t("description")} {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="dueDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("due-date")}</FormLabel>
                    <FormControl>
                      <Input placeholder={t("due-date")} {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("amount")}</FormLabel>
                    <FormControl>
                      <Input placeholder={t("amount")} {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="transactionType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("transaction-type")}</FormLabel>
                    <FormControl>
                      <Input placeholder={t("transaction-type")} {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          )}
        </div>

        <ButtonActions
          disabledConfirm={isLoading || isError}
          onCancel={() => router.back()}
        />
      </form>
    </Form>
  );
};

export default TransactionForm;
