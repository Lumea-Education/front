import { useNavigate } from "react-router-dom";
import React from "react";
import { Position } from "../../types/types";

interface VolunteerProps {
  positions: Position[];
}

const Volunteer: React.FC<VolunteerProps> = ({ positions }) => {
  const navigate = useNavigate();

  return (
    <div className="w-full py-4">
      <div className="md:pl-4">
        <h2 className="text-xl font-bold mb-2">Volunteer Positions</h2>

        {positions.length > 0 ? (
          <ul className="space-y-4">
            {positions.map((pos, index) => (
              <li
                key={index}
                className="border p-4 rounded-lg shadow-lg bg-white transition-all hover:shadow-xl"
              >
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold text-blue-600">
                    {pos.title}
                  </h2>
                  <div className="flex items-center gap-8">
                    <p className="text-gray-600">{pos.type}</p>
                    <p className="text-gray-600">{pos.location}</p>
                  </div>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <p className="text-gray-500 text-sm">
                    <strong>Posted on:</strong> {pos.datePosted}
                  </p>
                  <button
                    className="bg-cyan-500 text-white px-6 py-2 rounded-lg hover:cursor-pointer hover:bg-blue-500 transition"
                    onClick={() =>
                      navigate(
                        `/careers/volunteer/${pos.title.replace(/\s+/g, "-")}`
                      )
                    }
                  >
                    Apply
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">Coming Soon</p>
        )}
      </div>
    </div>
  );
};

export default Volunteer;
