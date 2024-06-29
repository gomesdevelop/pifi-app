"use client";

import { useRouter } from "next/navigation";
import { Dialog, DialogContent, DialogOverlay } from "./ui/dialog";

export function Modal({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  const handleClose = () => {
    router.back();
  };

  return (
    <Dialog defaultOpen={true} open={true} onOpenChange={handleClose}>
      {children}
    </Dialog>
  );
}
