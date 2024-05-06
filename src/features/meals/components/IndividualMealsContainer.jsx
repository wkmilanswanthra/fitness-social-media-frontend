import React from "react";
import { Avatar, Carousel } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

function IndividualMealsContainer({
  user,
  mealName,
  description,
  ingredients,
  cookingInstructions,
  photos,
  dietaryPreferences,
}) {
  const navigate = useNavigate();

  return (
    <div className="bg-white p-6 mb-6 rounded-lg shadow-md">
      <div className="flex items-center mb-4">
        <Avatar icon={<UserOutlined />} />
        <span
          className="font-semibold ml-4 text-lg cursor-pointer"
          onClick={() => navigate(`/user/${user.id}`)}
        >
          {user.username}
        </span>
      </div>

      <div className="mb-4">
        <h2 className="text-2xl font-semibold mb-2">{mealName}</h2>
        <p className="text-gray-700">{description}</p>
      </div>

      <div className="mb-4">
        <h3 className="font-semibold mb-2">Ingredients:</h3>
        <ul className="list-disc list-inside">
          {ingredients.map((ingredient, index) => (
            <li key={index} className="ml-4 text-gray-700">
              {ingredient}
            </li>
          ))}
        </ul>
      </div>

      <div className="mb-4">
        <h3 className="font-semibold mb-2">Cooking Instructions:</h3>
        <p className="text-gray-700">{cookingInstructions}</p>
      </div>

      <div className="mb-4">
        <h3 className="font-semibold mb-2">Dietary Preferences:</h3>
        <ul className="list-disc list-inside">
          {dietaryPreferences.map((preference, index) => (
            <li key={index} className="ml-4 text-gray-700">
              {preference}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default IndividualMealsContainer;
