import React, { useState } from "react";
import { Button } from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";

function SideButton({ text, icon }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div className="relative overflow-hidden flex items-center ">
      <Button
        type="default"
        shape="square"
        className="rounded-lg z-10 bg-white border-solid border-2 border-[#02a44549] hover:border-gray-400 hover:bg-gray-100 transition-all duration-300"
        icon={icon}
        style={{ width: "50px", height: "50px" }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      />

      <div
        className={`absolute top-0 rounded-lg left-0 h-[50px]  transition-transform duration-300 transform ${
          hovered ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{ width: "300px" }}
      >
        <div className="flex ml-16 items-center  h-[50px] ">
          <span className="text-gray-800 font-semibold font-lg">{text}</span>
        </div>
      </div>
    </div>
  );
}

export default SideButton;
