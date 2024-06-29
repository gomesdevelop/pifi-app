import SheetModal from "@/components/sheet-modal";
import React from "react";
import CreateForm from "../../../transactions/create/create-form";

const CreateModal: React.FC = () => {
  return (
    <SheetModal>
      <CreateForm />
    </SheetModal>
  );
};

export default CreateModal;
