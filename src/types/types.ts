export type FilterCountryType = "All" | "Canada" | "US" | "Korea";
export type CountryType = "Canada" | "US" | "Korea";

export type CategoryType =
  | "Payroll"
  | "Product Development"
  | "Technology"
  | "Support Operations";

export interface Position {
  title: string;
  type: "Remote" | "Hybrid" | "In-Office";
  location: CountryType;
  datePosted: string;
  category: CategoryType;
}
