import React from "react";
import LaborList from "./list";

const TransactionsPage: React.FC = () => {
  return (
    <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
      <LaborList />
    </main>
  );
};

export default TransactionsPage;
