import React from "react";
import { Card, Avatar } from "antd";
import { UserOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { deleteWorkout, updateWorkout } from "../api/workouts.api";
import UpdateWorkoutPlanModal from "../modals/UpdateWorkoutPlanModal";

function IndividualWorkoutContainer({ workout }) {
  const { id } = workout?.user;
  const curUser = useSelector((state) => state.auth.user);
  const [open, setOpen] = React.useState(false);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleDeleteWorkout = (id) => {
    console.log("Delete Workout", id);
    dispatch(deleteWorkout(id));
    navigate(0);
  };

  return (
    <div className="bg-white p-4 mb-4 rounded-lg shadow">
      <div className="flex items-center mb-4 justify-between">
        <div>
          <Avatar icon={<UserOutlined />} />
          <span
            className="font-semibold ml-4 text-lg cursor-pointer"
            onClick={() => navigate(`/user/${id}`)}
          >
            {workout?.user?.firstName}
          </span>
        </div>
        {id == curUser.id && (
          <div>
            <EditOutlined
              className="ml-4 text-blue-500 cursor-pointer"
              onClick={() => setOpen(true)}
            />
            <DeleteOutlined
              className="ml-4 text-red-500 cursor-pointer"
              onClick={() => handleDeleteWorkout(workout?.planID)}
            />
          </div>
        )}
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
      <UpdateWorkoutPlanModal
        open={open}
        onClose={() => setOpen(false)}
        workout={workout}
      />
    </div>
  );
}

export default IndividualWorkoutContainer;
