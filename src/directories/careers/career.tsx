import { Link, useParams } from "react-router-dom";
import React from "react";
import { Position } from "../../types/types";

interface CareerProps {
  positions: Position[];
}

const Career: React.FC<CareerProps> = ({ positions }) => {
  const { positionName } = useParams<{ positionName: string }>();

  return (
    <div className="w-full py-4">
      <div className="md:pl-4">
        <h2 className="text-xl font-bold mb-2">Career Positions</h2>

        {/* ✅ positionName이 존재하면 화면에 출력 */}
        {positionName && (
          <p className="text-gray-500 italic">
            Currently viewing: {positionName.replace("-", " ")}
          </p>
        )}

        {positions.length > 0 ? (
          <ul className="space-y-4">
            {positions.map((pos, index) => {
              // URL-friendly한 직무 이름 생성
              const positionPath = pos.title.toLowerCase().replace(/\s+/g, "-");

              return (
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
                    {/* ✅ Apply 버튼을 클릭하면 직무에 맞는 지원 페이지로 이동 */}
                    <Link
                      to={`/careers/${positionPath}`}
                      state={{ position: pos }}
                    >
                      <button className="bg-cyan-500 text-white px-6 py-2 rounded-lg hover:cursor-pointer hover:bg-blue-500 transition">
                        Apply
                      </button>
                    </Link>
                  </div>
                </li>
              );
            })}
          </ul>
        ) : (
          <p className="text-gray-500">Coming Soon</p>
        )}
      </div>
    </div>
  );
};

export default Career;
