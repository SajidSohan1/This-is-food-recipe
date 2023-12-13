import React from "react";
import { NavLink } from "react-router-dom";

const AdminMenu = () => {
  return (
    <>
      <div className="text-center">
        <h4>Admin Dashboard</h4>
        <div className="list-group">
          <NavLink
            to="/dashboard/admin/add-category"
            className="list-group-item list-group-item-action"
          >
            Add Category
          </NavLink>

          <NavLink
            to="/dashboard/admin/add-recipe"
            className="list-group-item list-group-item-action"
          >
            Add Recipe
          </NavLink>

          <NavLink
            to="/dashboard/admin/recipes"
            className="list-group-item list-group-item-action"
          >
            All Recipes
          </NavLink>

          <NavLink
            to="/dashboard/admin/users"
            className="list-group-item list-group-item-action"
          >
            Users
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default AdminMenu;
