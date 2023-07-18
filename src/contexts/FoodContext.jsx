import { ACTIONS, API } from "../utils/consts.js";
import React, { createContext, useContext, useReducer } from "react";
import axios from "axios";
import { notify } from "../components/Toastify.jsx";

const foodContext = createContext();

export function useFoodContext() {
  return useContext(foodContext);
}

const init = {
  dishes: [],
  dish: null,
};

function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.dishes:
      return { ...state, dishes: action.payload };
    case ACTIONS.dish:
      return { ...state, dish: action.payload };

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

  async function getOneDish(id) {
    try {
      const { data } = await axios.get(`${API}/${id}`);

      dispatch({
        type: ACTIONS.dish,
        payload: data,
      });
    } catch (e) {
      console.log(e);
    }
  }

  async function editDish(id, newData) {
    try {
      await axios.patch(`${API}/${id}`, newData);
      notify("Successfully saved changes");
    } catch (e) {
      notify(`${e.response.status}: ${e.response.statusText}`, "error");
    }
  }

  async function addDish(newDish) {
    try {
      await axios.post(API, newDish);
      notify("Dish added successfully");
    } catch (e) {
      notify(`${e.response.status}: ${e.response.statusText}`, "error");
    }
  }

  async function deleteDish(id) {
    try {
      await axios.delete(`${API}/${id}`);
      notify("Dish deleted successfully");
      getDishes();
    } catch (e) {
      notify(`${e.response.status}: ${e.response.statusText}`, "error");
    }
  }

  const value = {
    addDish,
    dishes: state.dishes,
    dish: state.dish,
    getDishes,
    deleteDish,
    getOneDish,
    editDish,
  };

  return <foodContext.Provider value={value}>{children}</foodContext.Provider>;
};

export default FoodContext;
