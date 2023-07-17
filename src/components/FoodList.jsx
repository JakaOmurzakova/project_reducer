import React, { useEffect } from "react";
import FoodItem from "./FoodItem";
import { Box, CircularProgress } from "@mui/material";
import { useFoodContext } from "../contexts/FoodContext";

const FoodList = () => {
  const { dishes, getDishes } = useFoodContext();

  useEffect(() => {
    getDishes();
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        mt: 5,
        gap: "30px",
      }}
    >
      {dishes.length > 0 ? (
        dishes.map((item) => <FoodItem key={item.id} item={item} />)
      ) : (
        <CircularProgress
          sx={{ mx: "auto", mt: 5, display: "block" }}
          size={100}
        />
      )}
    </Box>
  );
};

export default FoodList;
