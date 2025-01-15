import dayjs from "@homefront/dayjs";
import { DonationType, StripeProduct } from "@homefront/db";

import { MONTHLY_AMOUNTS, ONE_TIME_AMOUNTS, YEARLY_AMOUNTS } from "./data";

export const formatAmount = (amount: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount / 100);
};

export const getAmounts = (type: DonationType) => {
  switch (type) {
    case "one_time":
      return ONE_TIME_AMOUNTS;
    case "monthly":
      return MONTHLY_AMOUNTS;
    case "yearly":
      return YEARLY_AMOUNTS;
  }
};

export const getSupportUsHeader = (type: string) => {
  switch (type) {
    case "one_time":
      return "Support us just once";
    case "monthly":
      return "Support us every month";
    case "yearly":
      return "Support us every year";
    default:
      return "Support us";
  }
};

export const sanitizeValue = (value: string) => {
  return value
    .replace(/[^0-9.]/g, "") // Remove non-numeric characters except .
    .replace(/(\..*?)\./g, "$1") // Allow only one decimal point
    .replace(/^0+/, "") // Remove leading zeros
    .replace(/^\./, "") // Remove leading .
    .replace(/(\.\d{2})\d+/, "$1"); // Limit to two decimal places
};

export const getProductForType = (type: string, products?: StripeProduct[]) => {
  if (!products) {
    return;
  }

  switch (type) {
    case "one_time":
      return products.find((product) => product.name === "Donation");
    case "monthly":
      return products.find((product) => product.name === "Monthly Donation");
    case "yearly":
      return products.find((product) => product.name === "Yearly Donation");
  }
};

export const formatMonthDayMaybeYear = (timestamp: number) => {
  const date = new Date(timestamp * 1000);
  const day = dayjs(date);
  const today = dayjs();
  if (day.year() === today.year()) {
    return day.format("MMM D");
  }

  return day.format("MMM D, YYYY");
};
