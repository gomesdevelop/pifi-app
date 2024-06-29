import React from "react";
import Sidebar from "@/components/sidebar";
import Header from "@/components/header";

const Layout = ({
  modals,
  children,
}: {
  modals: React.ReactNode;
  children: React.ReactNode;
}) => {
  return (
    <div className="h-full flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
      <Header />
      <div>
        <Sidebar />
        {modals}
        {children}
      </div>
    </div>
  );
};

export default Layout;
