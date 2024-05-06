import React from "react";
import IndividualWorkoutContainer from "./IndividualWorkoutContainer";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getAllWorkouts } from "../api/workouts.api";

function WorkoutContainer() {
  const workouts = useSelector((state) => state.workouts.workouts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllWorkouts());
  }, []);
  return (
    <div className="w-full  px-12 pt-10  mt-14 pb-16">
      {workouts?.map((workout) => (
        <IndividualWorkoutContainer key={workout.id} workout={workout} />
      ))}
    </div>
  );
}

export default WorkoutContainer;
