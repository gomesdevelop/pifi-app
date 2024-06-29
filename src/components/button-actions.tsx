import React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

interface ButtonActions
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  onConfirm?: () => void;
  onCancel?: () => void;
  disabledConfirm?: boolean;
}

const ButtonActions: React.FC<ButtonActions> = ({
  onConfirm,
  onCancel,
  className,
  disabledConfirm,
  ...rest
}) => {
  const t = useTranslations("Actions");

  return (
    <div className={cn("flex justify-end space-x-2", className)} {...rest}>
      <Button type="reset" variant="ghost" onClick={onCancel}>
        {t("cancel")}
      </Button>
      <Button type="submit" onClick={onConfirm} disabled={disabledConfirm}>
        {t("confirm")}
      </Button>
    </div>
  );
};

export default ButtonActions;
