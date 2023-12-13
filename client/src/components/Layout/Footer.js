import React from "react";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <div className="footer">
      <h1 className="text-center">Food Recipe Webapp for CSE470</h1>
      <p className="text-center mt-3">
        <Link to="/about">About</Link>|<Link to="/contact">Contact</Link>
      </p>
    </div>
  );
};
