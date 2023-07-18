import React from "react";
import HomePage from "../pages/HomePage";
import NoteFoundPage from "../pages/NoteFoundPage";
import { Routes, Route } from "react-router-dom";
import MainLayouts from "../layouts/MainLayouts";
import MenuPage from "../pages/MenuPage";
import AddFoodPage from "../pages/AddFoodPage";
import EditFoodPage from "../pages/EditFoodPage";

const MainRoute = () => {
  return (
    <div>
      <Routes>
        <Route element={<MainLayouts />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/menu" element={<MenuPage />} />
          <Route path="/add" element={<AddFoodPage />} />
          <Route path="/edit/:id" element={<EditFoodPage />} />
        </Route>

        <Route path="*" element={<NoteFoundPage />} />
      </Routes>
    </div>
  );
};

export default MainRoute;
