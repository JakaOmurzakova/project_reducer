import React, { useEffect } from "react";
import { useFoodContext } from "../contexts/FoodContext";
import FoodList from "../components/FoodList";

const MenuPage = () => {
  return (
    <div>
      <FoodList />
    </div>
  );
};

export default MenuPage;
