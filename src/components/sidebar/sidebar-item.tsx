import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Link, usePathname } from "@/navigation";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

interface SidebarItemProps {}

const SidebarItem: React.FC<Action> = ({ href, name, icon: Icon }) => {
  const pathname = usePathname();
  const t = useTranslations("Sidebar");

  const isSelected = (value: string): string =>
    pathname === value
      ? "bg-accent text-accent-foreground"
      : "text-muted-foreground";

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div
          className={cn(
            "flex h-9 w-9 items-center justify-center rounded-lg  transition-colors hover:text-foreground md:h-8 md:w-8",
            isSelected(href)
          )}
        >
          <Link href={href}>
            <Icon className="h-5 w-5" />
            <span className="sr-only">{t(name)}</span>
          </Link>
        </div>
      </TooltipTrigger>
      <TooltipContent side="right">{t(name)}</TooltipContent>
    </Tooltip>
  );
};

export default SidebarItem;
