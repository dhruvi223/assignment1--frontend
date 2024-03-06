import React, { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch} from 'react-redux';
import { getUserData } from "../redux/actions/productActions";

const Profile = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  useEffect(() => {
    if (role === "user") {
      document.getElementById("create-list").style.display = "none";
      document.getElementById("update").style.display = "none";
      document.getElementById("delete").style.display = "none";
    }
    if (role === "admin") {
      document.getElementById("wishlist").style.display = "none";
    }
  }, [role]);

// getting user details
  useEffect(() => {
    const getData = async () => {
    const storedDataS = localStorage.getItem("user");
    const storedData = JSON.parse(storedDataS);
    const userEmail = storedData.email;
    const userData = await dispatch(getUserData(userEmail));
        setEmail(userData.email);
        setRole(userData.role);
  }

  getData()

  }, []);

  return (
    <>
      <div className="p-3 max-w-lg mx-auto">
        <div className="title">
          <h1 className="text-3xl text-center font-semibold my-7">Profile</h1>
        </div>

        <form className="flex flex-col gap-4">
          <input
            className="border p-3 rounded-lg w-100"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          />
          <input
            className="border p-3 rounded-lg w-100"
            value={role}
            onChange={(event) => {
              setRole(event.target.value);
            }}
          />

          <Link to={"/create-list"}>
            <div
              id="create-list"
              className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
            >
              <button>Create List</button>
            </div>
          </Link>
          <Link to={"/update"}>
            <div
              id="update"
              className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
            >
              <button>Update List</button>
            </div>
          </Link>
          <Link to={"/delete"}>
            <div
              id="delete"
              className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
            >
              <button>Delete List</button>
            </div>
          </Link>
          <Link to={"/liked"}>
            <div
              id="wishlist"
              className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
            >
              <button>Your Wishlist</button>
            </div>
          </Link>
        </form>
      </div>
    </>
  );
};

export default Profile;
