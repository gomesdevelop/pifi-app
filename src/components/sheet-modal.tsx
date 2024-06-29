"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Sheet, SheetContent, SheetOverlay } from "./ui/sheet";

function SheetModal({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  const handleClose = () => {
    router.back();
  };

  return (
    <Sheet open={true} onOpenChange={handleClose} defaultOpen={true}>
      <SheetContent className="overflow-y-hidden">{children}</SheetContent>
    </Sheet>
  );
}

export default SheetModal;
