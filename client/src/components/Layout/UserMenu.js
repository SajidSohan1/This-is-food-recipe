import React from "react";
import { NavLink } from "react-router-dom";

const UserMenu = () => {
  return (
    <>
      <div className="text-center">
        <h4>Dashboard</h4>
        <div className="list-group">
          <NavLink
            to="/dashboard/user/profile"
            className="list-group-item list-group-item-action"
          >
            Profile
          </NavLink>

          {/* <NavLink
            to="/dashboard/user/add-category"
            className="list-group-item list-group-item-action"
          >
            Add Category
          </NavLink>
          <NavLink
            to="/dashboard/user/add-recipe"
            className="list-group-item list-group-item-action"
          >
            Add Recipe
          </NavLink> */}

          <NavLink
            to="/user/planned-meals"
            className="list-group-item list-group-item-action"
          >
            Planned Meals
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default UserMenu;
