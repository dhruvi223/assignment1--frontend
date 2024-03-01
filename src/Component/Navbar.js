import React from "react";
import { Link } from "react-router-dom";

const Navbar = (props) => {
  const { loggedIn, email } = props;

  return (
    <header className="bg-slate-200 shadow-md">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <Link to={"/"}>
          <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
            <span className="text-slate-500">Ecommerce</span>
            <span className="text-slate-700">Platform</span>
          </h1>
        </Link>


        <ul className="flex gap-4">
          <Link to={"/"}>
            <li className="text-slate-700 hover:underline">Home</li>
          </Link>

          {!loggedIn && (
            <Link to={"/login"}>
              <li className="text-slate-700 hover:underline">Sign in</li>
            </Link>
          )}

          {loggedIn && (
            <Link to={"/profile"}>
              <li className="text-slate-700 hover:underline">Profile</li>
            </Link>
          )}

          <Link to={"/show-list"}>
            <li className="text-slate-700 hover:underline">List</li>
          </Link>
        </ul>
      </div>
    </header>
  );
};

export default Navbar;
