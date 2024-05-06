import React from "react";
import IndividualMealsContainer from "./IndividualMealsContainer";

function MealsContainer() {
  const meals = [
    {
      id: 1,
      user: { username: "Pradeep", id: 1 },
      mealName: "Spaghetti Carbonara",
      description: "Classic Italian pasta dish with bacon and eggs.",
      ingredients: ["Spaghetti", "Bacon", "Eggs", "Parmesan cheese", "Garlic"],
      cookingInstructions:
        "Cook spaghetti, fry bacon, mix with eggs and cheese.",
      dietaryPreferences: ["Low-carb", "High-protein"],
    },
    {
      id: 2,
      user: { username: "Pradeep", id: 1 },
      mealName: "Grilled Salmon",
      description: "Healthy dish with grilled salmon fillets.",
      ingredients: ["Salmon fillets", "Lemon", "Olive oil", "Herbs"],
      cookingInstructions:
        "Marinate salmon, grill until cooked, squeeze lemon juice.",
      dietaryPreferences: ["Gluten-free", "Low-calorie"],
    },
  ];

  return (
    <div className="w-full px-12 pt-10 mt-14 pb-16">
      {meals.map((meal) => (
        <IndividualMealsContainer key={meal.id} {...meal} />
      ))}
    </div>
  );
}

export default MealsContainer;
