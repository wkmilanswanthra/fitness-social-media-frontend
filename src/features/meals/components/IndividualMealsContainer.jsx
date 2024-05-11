import React from "react";
import { Avatar, Carousel } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import { updateMeal, deleteMeal } from "../api/meals.api";
import UpdateMealPlanModal from "../modals/UpdateMealPlanModal";

function IndividualMealsContainer({
  user,
  mealName,
  description,
  ingredients,
  cookingInstructions,
  photos,
  dietaryPreferences,
  mealID,
}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const curUser = useSelector((state) => state.auth.user);
  const [open, setOpen] = React.useState(false);

  const handleDeleteMeal = (id) => {
    console.log("Delete Meal");
    dispatch(deleteMeal(id));
    navigate(0);
  };

  return (
    <div className="bg-white p-6 mb-6 rounded-lg shadow-md">
      <div className="flex items-center mb-4 justify-between">
        <div>
          <Avatar icon={<UserOutlined />} />
          <span
            className="font-semibold ml-4 text-lg cursor-pointer"
            onClick={() => navigate(`/user/${user?.id}`)}
          >
            {user?.firstName}
          </span>
        </div>
        {user.id == curUser.id && (
          <div>
            <EditOutlined
              className="ml-4 text-blue-500 cursor-pointer"
              onClick={() => setOpen(true)}
            />
            <DeleteOutlined
              className="ml-4 text-red-500 cursor-pointer"
              onClick={() => handleDeleteMeal(mealID)}
            />
          </div>
        )}
      </div>

      <div className="mb-4">
        <h2 className="text-2xl font-semibold mb-2">{mealName}</h2>
        <p className="text-gray-700">{description}</p>
      </div>

      <div className="flex justify-between">
        <div className="mb-4">
          <h3 className="font-semibold mb-2">Ingredients:</h3>
          <ul className="list-disc list-inside">
            {ingredients?.map((ingredient, index) => (
              <li key={index} className="ml-4 text-gray-700">
                {ingredient}
              </li>
            ))}
          </ul>
        </div>

        <Carousel
          autoplay
          style={{
            width: "100px",
            height: "100px",
          }}
        >
          {photos?.map((photo, index) => (
            <div key={index}>
              <img
                src={photo}
                alt="meal"
                style={{
                  width: "100px",
                  height: "100px",
                  objectFit: "cover",
                  borderRadius: "20%",
                }}
              />
            </div>
          ))}
        </Carousel>
      </div>
      <div className="mb-4">
        <h3 className="font-semibold mb-2">Cooking Instructions:</h3>
        <p className="text-gray-700">{cookingInstructions}</p>
      </div>

      <div className="mb-4">
        <h3 className="font-semibold mb-2">Dietary Preferences:</h3>
        <ul className="list-disc list-inside">
          {dietaryPreferences?.map((preference, index) => (
            <li key={index} className="ml-4 text-gray-700">
              {preference}
            </li>
          ))}
        </ul>
      </div>
      <UpdateMealPlanModal
        open={open}
        setOpen={setOpen}
        mealID={mealID}
        mealName={mealName}
        description={description}
        ingredients={ingredients}
        cookingInstructions={cookingInstructions}
        photos={photos}
        dietaryPreferences={dietaryPreferences}
      />
    </div>
  );
}

export default IndividualMealsContainer;
