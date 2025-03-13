// ✅ 국가 타입 (필터용 & 데이터 저장용 분리)
export type FilterCountryType = "All" | "Canada" | "US" | "Korea";
export type CountryType = "Canada" | "US" | "Korea";

// ✅ 카테고리 타입
export type CategoryType =
  | "Payroll"
  | "Product Development"
  | "Technology"
  | "Support Operations";

// ✅ Position 타입 정의
export interface Position {
  title: string;
  type: "Remote" | "Hybrid" | "In-Office";
  location: CountryType; // ✅ "All"이 포함되지 않음
  datePosted: string;
  category: CategoryType;
}
