import EditForm from "@/app/[locale]/(app)/transactions/edit/[id]/edit-form";
import SheetModal from "@/components/sheet-modal";
import React from "react";

const EditModal: React.FC = () => {
  return (
    <SheetModal>
      <EditForm />
    </SheetModal>
  );
};

export default EditModal;
