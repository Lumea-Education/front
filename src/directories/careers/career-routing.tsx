import { useState, useEffect } from "react";
import Filter from "../../components/filter";
import Career from "./career";
import Volunteer from "./volunteer";
import { Position, FilterCountryType, CategoryType } from "../../types/types";

const CareerRouting: React.FC = () => {
  const [selectedCountry, setSelectedCountry] =
    useState<FilterCountryType>("All");
  const [selectedCategory, setSelectedCategory] = useState<
    CategoryType | "All"
  >("All");

  const openPositions: Position[] = [
    {
      title: "Frontend Engineer",
      type: "Remote",
      location: "Canada",
      datePosted: "March 10, 2025",
      category: "Technology",
    },
    {
      title: "Backend Engineer",
      type: "Hybrid",
      location: "US",
      datePosted: "March 9, 2025",
      category: "Technology",
    },
    {
      title: "Product Manager",
      type: "In-Office",
      location: "Korea",
      datePosted: "March 8, 2025",
      category: "Product Development",
    },
  ];

  const volunteerPositions: Position[] = [
    {
      title: "Lead Frontend Developer",
      type: "Remote",
      location: "Canada",
      datePosted: "March 10, 2025",
      category: "Technology",
    },
    {
      title: "Backend Developer",
      type: "Hybrid",
      location: "US",
      datePosted: "March 9, 2025",
      category: "Technology",
    },
    {
      title: "Product Manager",
      type: "In-Office",
      location: "Korea",
      datePosted: "March 8, 2025",
      category: "Product Development",
    },
  ];

  const getFilteredPositions = (positions: Position[]) => {
    return positions.filter(
      (pos) =>
        (selectedCountry === "All" || selectedCountry === pos.location) &&
        (selectedCategory === "All" || selectedCategory === pos.category)
    );
  };

  const [filteredCareerPositions, setFilteredCareerPositions] = useState<
    Position[]
  >(getFilteredPositions(openPositions));
  const [filteredVolunteerPositions, setFilteredVolunteerPositions] = useState<
    Position[]
  >(getFilteredPositions(volunteerPositions));

  useEffect(() => {
    setFilteredCareerPositions(getFilteredPositions(openPositions));
    setFilteredVolunteerPositions(getFilteredPositions(volunteerPositions));
  }, [selectedCountry, selectedCategory]);

  return (
    <div className="md:flex max-w-[1440px] mx-auto">
      <div className="md:w-1/4 w-full px-6 md:px-0">
        <Filter
          onFilterChange={(country, category) => {
            setSelectedCountry(country);
            setSelectedCategory(category);
          }}
        />
      </div>

      <div className="md:w-3/4 w-full my-10 md:my-0 px-6 md:px-0">
        <Volunteer positions={filteredVolunteerPositions} />
        <Career positions={filteredCareerPositions} />
      </div>
    </div>
  );
};

export default CareerRouting;
