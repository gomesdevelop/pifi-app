import { number } from "zod";
import en from "./messages/en.json";
import { ReactNode } from "react";
import { MessageKeys } from "next-intl";
import { string } from "yup";

type Messages = typeof en_US;

declare global {
  // Use type safe message keys with `next-intl`
  interface IntlMessages extends Messages {
    DataTable: {
      "no-results": string;
      view: string;
      "toggle-columns": string;
      "filter-by": string;
      reset: string;
      "row-selected": string;
      "rows-per-page": string;
      pagination: string;
      "first-page": string;
      "last-page": string;
      "previous-page": string;
      "next-page": string;
    };
    Login: {
      title: string;
      greetings: string;
      description: string;
      email: string;
      password: string;
      submit: string;
      "forgot-password": string;
      "sign-up": string;
      "dont-have-account": string;
    };
    Actions: {
      confirm: string;
      cancel: string;
      edit: string;
      delete: string;
      create: string;
      update: string;
    };
    Sidebar: {
      dashboard: string;
      new: string;
      create: string;
      plural: {
        transaction: string;
      };
      singular: {
        transaction: string;
      };
      settings: string;
    };
    Transaction: {
      list: {
        title: string;
        description: string;
      };
      name: string;
      description: string;
      "due-date": string;
      amount: string;
      "transaction-type": string;
      create: string;
      update: string;
      delete: string;
      actions: string;
      messages: {
        deleted: string;
        updated: string;
        created: string;
        "not-found": string;
        "already-exists": string;
        "confirm-delete": string;
        "undone-operation": string;
        confirmation: string;
        "error-occurred": string;
        "error-delete": string;
        "error-update": string;
        "error-create": string;
      };
    };
  }

  interface BaseEntity {
    id?: string;
  }

  interface Transaction extends BaseEntity {
    id: string;
    userId: string;
    description: string;
    dueDate: string;
    amount: number;
    transactionType: number;
  }

  interface Action {
    name: MessageKeys;
    label?: string;
    href: string;
    icon?: ElementType;
    common?: boolean;
    onClick?: () => void;
  }
}
