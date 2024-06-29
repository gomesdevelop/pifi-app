import { cn } from "@/lib/utils";
import { Link, usePathname } from "@/navigation";
import { useTranslations } from "next-intl";
import React from "react";

const NavItem: React.FC<Action> = ({ name, href, icon: Icon }) => {
  const pathname = usePathname();
  const t = useTranslations("Sidebar");

  const isSelected = (value: string): string =>
    pathname === value ? " text-foreground " : "";

  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground",
        isSelected(href)
      )}
    >
      <Icon className="h-5 w-5 transition-all group-hover:scale-110" />
      {t(name)}
    </Link>
  );
};

export default NavItem;
