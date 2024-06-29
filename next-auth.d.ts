import "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface User {
    id: string | number;
  }

  interface Session {
    user: User;
    token: JWT;
  }
}
