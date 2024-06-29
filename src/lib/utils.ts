import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const currencyList = new Map();
currencyList.set("en-US", "USD");
currencyList.set("pt-BR", "BRL");

type FormatCurrencyOptions = {
  locale: string;
};

export const formatCurrency = (
  amount: number,
  options?: FormatCurrencyOptions
): any =>
  Intl.NumberFormat(options?.locale ?? "pt-BR", {
    style: "currency",
    currency: currencyList.get(options?.locale ?? "pt-BR"),
  }).format(amount);

export const unitOfMeasureListSymbols = new Map();
unitOfMeasureListSymbols.set("GRAMS", "g");
unitOfMeasureListSymbols.set("KILOGRAMS", "kg");
unitOfMeasureListSymbols.set("LITERS", "L");
unitOfMeasureListSymbols.set("MILLILITERS", "ml");
unitOfMeasureListSymbols.set("UNITS", "un");
