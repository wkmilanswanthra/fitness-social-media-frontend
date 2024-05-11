import React, { useEffect, useState } from "react";
import { Modal, Form, Input, Button } from "antd";
import { PlusOutlined, MinusCircleOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { createWorkout, updateWorkout } from "../api/workouts.api";

const UpdateWorkoutPlanModal = ({ open, onClose, workout }) => {
  const [form] = Form.useForm();
  const [exercises, setExercises] = useState([
    { id: 1, exerciseName: "", sets: 0, repetitions: 0 },
  ]);
  const [nextId, setNextId] = useState(2);

  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    form.setFieldsValue({
      planName: workout?.planName,
      description: workout?.description,
    });

    if (workout?.exercises) {
      setExercises(workout.exercises);
    }
  }, [workout]);

  const onFinish = (values) => {
    const workoutPlan = {
      user: {
        id: user.id,
      },
      planID: workout?.planID,
      planName: values.planName,
      description: values.description,
      exercises: exercises.filter(
        (exercise) =>
          exercise.exerciseName && exercise.sets && exercise.repetitions
      ),
    };

    console.log("Workout Plan:", workoutPlan);
    dispatch(updateWorkout(workoutPlan));
    handleClose();
  };

  const handleClose = () => {
    onClose();
  };

  const handleAddExercise = () => {
    setExercises([
      ...exercises,
      { id: nextId, exerciseName: "", sets: 0, repetitions: 0 },
    ]);
    setNextId(nextId + 1);
  };

  const handleDeleteExercise = (id) => {
    setExercises(exercises.filter((exercise) => exercise.id !== id));
  };

  const handleExerciseChange = (id, field, value) => {
    const updatedExercises = exercises.map((exercise) =>
      exercise.id === id ? { ...exercise, [field]: value } : exercise
    );
    setExercises(updatedExercises);
  };

  return (
    <Modal
      title="Create Workout Plan"
      open={open}
      onCancel={handleClose}
      footer={null}
    >
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item
          label="Plan Name"
          name="planName"
          rules={[{ required: true, message: "Please enter a plan name" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="Description" name="description">
          <Input.TextArea />
        </Form.Item>

        {exercises.map((exercise) => (
          <div key={exercise.id}>
            <Form.Item label={`Exercise`} required={false}>
              <Input
                value={exercise.exerciseName}
                onChange={(e) =>
                  handleExerciseChange(
                    exercise.id,
                    "exerciseName",
                    e.target.value
                  )
                }
                placeholder="Exercise Name"
              />
            </Form.Item>
            <Form.Item label="Sets" required={false}>
              <Input
                type="number"
                value={exercise.sets}
                onChange={(e) =>
                  handleExerciseChange(
                    exercise.id,
                    "sets",
                    parseInt(e.target.value)
                  )
                }
                placeholder="Sets"
              />
            </Form.Item>
            <Form.Item label="Repetitions" required={false}>
              <Input
                type="number"
                value={exercise.repetitions}
                onChange={(e) =>
                  handleExerciseChange(
                    exercise.id,
                    "repetitions",
                    parseInt(e.target.value)
                  )
                }
                placeholder="Repetitions"
              />
            </Form.Item>
            <Button
              type="danger"
              icon={<MinusCircleOutlined />}
              onClick={() => handleDeleteExercise(exercise.id)}
            >
              Delete Exercise
            </Button>
          </div>
        ))}

        <Button
          type="dashed"
          onClick={handleAddExercise}
          style={{ width: "100%", marginBottom: "20px" }}
          icon={<PlusOutlined />}
        >
          Add Exercise
        </Button>

        <Form.Item>
          <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
            Update Workout Plan
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UpdateWorkoutPlanModal;
