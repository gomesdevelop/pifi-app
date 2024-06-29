"use client";

import {
  Home,
  Package,
  Settings,
  Lollipop,
  Cable,
  HandPlatter,
  HandCoins,
  CookingPot,
} from "lucide-react";
import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Link, usePathname } from "@/navigation";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { items } from "@/app/[locale]/(app)/menu-items";
import SidebarItem from "./sidebar-item";

// import { Container } from './styles';

const Sidebar: React.FC = () => {
  const pathname = usePathname();
  const t = useTranslations("Sidebar");

  const isActive = (href: string) => pathname === href;

  const isSelected = (active: boolean): string =>
    active ? "bg-accent text-accent-foreground" : "text-muted-foreground";

  return (
    <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
      <nav className="flex flex-col items-center gap-4 px-2 py-4">
        <Link href="/">
          <div className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base">
            <Lollipop className="h-4 w-4 transition-all group-hover:scale-110" />
            <span className="sr-only">Confeito</span>
          </div>
        </Link>

        {items
          .filter((item) => item.common)
          .map((item) => (
            <SidebarItem
              key={item.href}
              name={item.name}
              href={item.href}
              icon={item.icon}
            />
          ))}
      </nav>
      <nav className="mt-auto flex flex-col items-center gap-4 px-2 py-4">
        <Tooltip>
          <TooltipTrigger asChild>
            <div
              className={cn(
                "flex h-9 w-9 items-center justify-center rounded-lg  transition-colors hover:text-foreground md:h-8 md:w-8",
                isSelected(isActive("/settings"))
              )}
            >
              <Link href="/settings">
                <Settings className="h-5 w-5" />
                <span className="sr-only">Settings</span>
              </Link>
            </div>
          </TooltipTrigger>
          <TooltipContent side="right">Settings</TooltipContent>
        </Tooltip>
      </nav>
    </aside>
  );
};

export default Sidebar;
