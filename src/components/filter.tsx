import { useState, useEffect } from "react";

type CountryType = "All" | "Canada" | "US" | "Korea";
type CategoryType =
  | "All"
  | "Payroll"
  | "Product Development"
  | "Technology"
  | "Support Operations";

interface FilterProps {
  onFilterChange: (country: CountryType, category: CategoryType) => void;
}

const Filter: React.FC<FilterProps> = ({ onFilterChange }) => {
  const [selectedCountry, setSelectedCountry] = useState<CountryType>("All");
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>("All");

  useEffect(() => {
    onFilterChange(selectedCountry, selectedCategory);
  }, [selectedCountry, selectedCategory]);

  return (
    <div className="w-full md:p-4 py-4 md:border-r border-gray-300 mx-auto">
      <div className="mb-4">
        <label className="block text-sm font-semibold mb-1">Country</label>
        <select
          className="w-full text-left font-semibold text-lg p-2 bg-gray-300 rounded"
          value={selectedCountry}
          onChange={(e) => setSelectedCountry(e.target.value as CountryType)}
        >
          <option value="All">All</option>
          <option value="Canada">Canada</option>
          <option value="US">US</option>
          <option value="Korea">Korea</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-semibold mb-1">Categories</label>
        <select
          className="w-full text-left font-semibold text-lg p-2 bg-gray-300 rounded"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value as CategoryType)}
        >
          <option value="All">All</option>
          <option value="Payroll">Payroll</option>
          <option value="Product Development">Product Development</option>
          <option value="Technology">Technology</option>
          <option value="Support Operations">Support Operations</option>
        </select>
      </div>
    </div>
  );
};

export default Filter;
