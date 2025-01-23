import tlds from "tlds";
import { z } from "zod";

export function formatUrl(url: string): string {
  if (!url) return url;
  if (!url.startsWith("http://") && !url.startsWith("https://")) {
    return `https://${url}`;
  }
  return url;
}

export function isValidUrlWithoutProtocol(url: string): boolean {
  return /^(?=.*\.[a-z]{2,})[^\s$.?#].[^\s]*$/i.test(url);
}

export function isValidTopLevelDomain(url: string): boolean {
  // Split potential URL into parts
  const parts = url.split(".");
  if (parts.length < 2) return false;

  // Get the TLD (last part)
  const tld = parts.at(-1)?.toLowerCase() ?? "";

  // Check if TLD exists in the official list
  if (!tlds.includes(tld)) return false;

  return true;
}

export const LinkSchema = z
  .string()
  .transform((value) => formatUrl(value))
  .refine(
    (value) => /^(https?):\/\/(?=.*\.[a-z]{2,})[^\s$.?#].[^\s]*$/i.test(value),
    {
      message: "Link doesn't look right",
    },
  )
  .refine((value) => isValidUrlWithoutProtocol(value), {
    message: "Link doesn't look right",
  });
