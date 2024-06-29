"use client";

import {
  QueryClient,
  QueryClientProvider as QueryClientProvideryTanstack,
} from "@tanstack/react-query";
import { Session } from "next-auth";
import { FC, PropsWithChildren } from "react";

const queryClient = new QueryClient();

interface ProviderProps extends PropsWithChildren {
  session: Session | null;
}

export const Providers: FC<ProviderProps> = ({ children, session }) => {
  return (
    <QueryClientProvideryTanstack client={queryClient}>
      {children}
    </QueryClientProvideryTanstack>
  );
};
