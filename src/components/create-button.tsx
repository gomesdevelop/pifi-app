import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";
import {
  ChevronDownIcon,
  CookingPot,
  Cable,
  HandPlatter,
  HandCoins,
} from "lucide-react";
import React from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Link } from "@/navigation";
import { useTranslations } from "next-intl";

// import { Container } from './styles';

const CreateButton: React.FC = () => {
  const t = useTranslations("Sidebar");

  return (
    <div className="flex items-center space-x-1 rounded-md bg-secondary text-secondary-foreground">
      <Button variant="secondary" className="px-3 shadow-none" asChild>
        <Link href="/transactions/create">
          <CookingPot className="mr-2 h-4 w-4" />
          {t("create")} {t("singular.transaction").toLowerCase()}
        </Link>
      </Button>
      <Separator orientation="vertical" className="h-[20px]" />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="secondary" className="px-2 shadow-none">
            <ChevronDownIcon className="h-4 w-4 text-secondary-foreground" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          alignOffset={-5}
          className="w-[200px]"
          forceMount
        ></DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default CreateButton;
