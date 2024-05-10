import React from "react";
import { Menu, ConfigProvider } from "antd";
import {
  UnorderedListOutlined,
  LineChartOutlined,
  FireOutlined,
  CameraOutlined,
} from "@ant-design/icons";
import CreatePostModal from "../../features/posts/modals/CreatePostModal";
import CreateStatusModal from "../../features/posts/modals/CreateStatusModal";
import CreateMealPlanModal from "../../features/meals/modals/CreateMealPlanModal";

const items = [
  {
    key: "createPost",
    label: <SideButton text="Create Post" icon={<CameraOutlined />} />,
  },
  {
    key: "addNewStatus",
    label: (
      <SideButton text="Add New Status" icon={<UnorderedListOutlined />} />
    ),
  },
  {
    key: "createNewWorkoutPlan",
    label: (
      <SideButton text="Create New Workout Plan" icon={<LineChartOutlined />} />
    ),
  },
  {
    key: "createNewMealPlan",
    label: <SideButton text="Create New Meal Plan" icon={<FireOutlined />} />,
  },
];

import SideButton from "./SideButton";
import CreateWorkoutModal from "../../features/workouts/modals/CreateWorkoutPlanModal";

function Sidebar() {
  const [CreatePostModalOpen, setCreatePostModalOpen] = React.useState(false);
  const [CreateStatusModalOpen, setCreateStatusModalOpen] =
    React.useState(false);
  const [CreateWorkoutPlanModalOpen, setCreateWorkoutPlanModalOpen] =
    React.useState(false);
  const [CreateMealPlanModalOpen, setCreateMealPlanModalOpen] =
    React.useState(false);

  const onClick = (e) => {
    console.log("click ", e);
    if (e.key === "createPost") {
      setCreatePostModalOpen(true);
    } else if (e.key === "addNewStatus") {
      setCreateStatusModalOpen(true);
    } else if (e.key === "createNewWorkoutPlan") {
      setCreateWorkoutPlanModalOpen(true);
    } else if (e.key === "createNewMealPlan") {
      setCreateMealPlanModalOpen(true);
    }
  };

  return (
    <div className="fixed left-0 top-16">
      <ConfigProvider
        theme={{
          components: {
            Menu: {
              itemHoverBg: "transparent",
              itemHeight: "75px",
              itemActiveBg: "transparent",
              itemSelectedBg: "transparent",
            },
          },
        }}
      >
        <Menu
          onClick={onClick}
          style={{
            width: 300,
            height: "calc(100vh - 64px)",
            paddingTop: "16px",
            backgroundColor: "#f3f4f6",
            border: "none",
          }}
          mode="vertical"
          items={items}
        />
      </ConfigProvider>
      <CreatePostModal
        open={CreatePostModalOpen}
        onClose={() => setCreatePostModalOpen(false)}
      />
      <CreateStatusModal
        open={CreateStatusModalOpen}
        onClose={() => setCreateStatusModalOpen(false)}
      />
      <CreateWorkoutModal
        open={CreateWorkoutPlanModalOpen}
        onClose={() => setCreateWorkoutPlanModalOpen(false)}
      />
      <CreateMealPlanModal
        open={CreateMealPlanModalOpen}
        onClose={() => setCreateMealPlanModalOpen(false)}
      />
    </div>
  );
}

export default Sidebar;
