export const ONE_TIME_AMOUNTS = [
  { label: "$5", value: 5.0 },
  { label: "$10", value: 10.0 },
  { label: "$25", value: 25.0 },
  { label: "$50", value: 50.0 },
  { label: "$100", value: 100.0 },
  { label: "$250", value: 250.0 },
];

export const MONTHLY_AMOUNTS = [
  { label: "$3", value: 3.0 },
  { label: "$5", value: 5.0 },
  { label: "$10", value: 10.0 },
  { label: "$25", value: 25.0 },
  { label: "$50", value: 50.0 },
  { label: "$100", value: 100.0 },
];

export const YEARLY_AMOUNTS = [
  { label: "$10", value: 10.0 },
  { label: "$25", value: 25.0 },
  { label: "$50", value: 50.0 },
  { label: "$75", value: 100.0 },
  { label: "$150", value: 150.0 },
  { label: "$500", value: 500.0 },
];

export const TYPES = [
  { label: "Just once", value: "one_time" as const },
  { label: "Monthly", value: "monthly" as const },
  { label: "Yearly", value: "yearly" as const },
];
