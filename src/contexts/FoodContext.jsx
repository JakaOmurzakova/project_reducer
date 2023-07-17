import { ACTIONS, API } from "../utils/consts.js";
import React, { createContext, useContext, useReducer } from "react";
import axios from "axios";

const foodContext = createContext();

export function useFoodContext() {
  return useContext(foodContext);
}

const init = {
  dishes: [],
};

function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.dishes:
      return { ...state, dishes: action.payload };

    default:
      return state;
  }
}

const FoodContext = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, init);

  async function getDishes() {
    try {
      const { data } = await axios.get(API);
      dispatch({
        type: ACTIONS.dishes,
        payload: data,
      });
    } catch (e) {
      console.log(e);
    }
  }

  async function addDish(newDish) {
    try {
      await axios.post(API, newDish);
    } catch (e) {
      console.log("error");
    }
  }

  const value = {
    addDish,
    dishes: state.dishes,
    getDishes,
  };

  return <foodContext.Provider value={value}>{children}</foodContext.Provider>;
};

export default FoodContext;
