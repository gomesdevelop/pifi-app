"use client";

import React from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchTransactions } from "@/services/transaction";
import { Button } from "@/components/ui/button";
import { Link } from "@/navigation";
import { useTranslations } from "next-intl";
import { Card } from "@/components/ui/card";
import { DataTable } from "@/components/data-table";
import { columns } from "./data/columns";

const TransactionList: React.FC = () => {
  const t = useTranslations("Transaction");

  const actions: Action[] = [
    {
      name: "edit",
      label: t("update"),
      href: "/transactions/edit/:id",
    },
    {
      name: "delete",
      label: t("delete"),
      href: "/transactions/delete/:id",
    },
  ];

  // Queries
  const { data, isLoading } = useQuery({
    queryKey: ["transactions"],
    queryFn: fetchTransactions,
  });

  if (isLoading)
    return (
      <div className="h-screen flex items-center justify-center">
        Loading...
      </div>
    );

  return (
    <Card>
      <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
        <div className="flex items-start justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">
              {t("list.title")}
            </h2>
            <p className="text-muted-foreground">{t("list.description")}</p>
          </div>
          <div>
            <Link href="/transactions/create">
              <Button>{t("create")} </Button>
            </Link>
          </div>
        </div>
        <DataTable data={data ?? []} columns={columns(t, actions)} />
      </div>
    </Card>
  );
};

export default TransactionList;
