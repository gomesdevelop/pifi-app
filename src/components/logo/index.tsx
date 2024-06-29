import { Link } from "@/navigation";
import { Wallet } from "lucide-react";
import React, { ReactNode } from "react";

type LogoProps = {
  children?: ReactNode;
  href?: string;
};

const Logo: React.FC<LogoProps> = ({ children, href = "/" }) => {
  return (
    <div className="flex items-center justify-center gap-2">
      <Link
        href={href}
        className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
      >
        <Wallet className="h-4 w-4 transition-all group-hover:scale-110" />
        <span className="sr-only">Acme Inc</span>
      </Link>
      {children}
    </div>
  );
};

export default Logo;
