import React from "react";
import { Card } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

function IndividualWorkoutContainer({ workout }) {
  const { id } = workout?.user;
  const navigate = useNavigate();
  console.log(workout);
  return (
    <div className="bg-white p-4 mb-4 rounded-lg shadow">
      <div className="flex items-center mb-4">
        <UserOutlined className="mr-2" />
        <span
          className="font-semibold cursor-pointer"
          onClick={() => navigate(`/user/${id}`)}
        >
          {workout?.user?.firstName}
        </span>
      </div>
      <h2 className="text-xl font-semibold mb-2">{workout?.planName}</h2>
      <p className="mb-4">{workout?.description}</p>
      <h3 className="font-semibold mb-2">Exercises:</h3>
      <ul className="space-y-2">
        {workout?.exercises.map((exercise) => (
          <li
            key={exercise?.exerciseID}
            className="bg-gray-100 rounded-md p-3 flex items-center justify-between"
          >
            <span className="font-semibold w-40">{exercise?.exerciseName}</span>
            <div className="flex flex-grow justify-center">
              <span className="ml-2">Sets: {exercise?.sets}</span>
            </div>
            <span className="ml-2">{exercise?.repetitions} Repetitions</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default IndividualWorkoutContainer;
