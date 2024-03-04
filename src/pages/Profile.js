import React, { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { getUserData } from "../api";

const Profile = () => {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  useEffect(() => {
    if (role === "user") {
      document.getElementById("yourDivId1").style.display = "none";
      document.getElementById("yourDivId2").style.display = "none";
      document.getElementById("yourDivId3").style.display = "none";
    }
    if (role === "admin") {
      document.getElementById("yourDivId4").style.display = "none";
    }
  }, [role]);

  useEffect(() => {
    const storedDataS = localStorage.getItem("user");
    const storedData = JSON.parse(storedDataS);
    const userEmail = storedData.email;

    getUserData(userEmail, setEmail, setRole);
  }, []);

  return (
    <>
      <div className="p-3 max-w-lg mx-auto">
        <div className="title">
          <h1 className="text-3xl text-center font-semibold my-7">Profile</h1>
        </div>

        <form className="flex flex-col gap-4">
          {/* <div className="border p-3 rounded-lg"> */}
            <input className="border p-3 rounded-lg w-100"
              value={email}
              placeholder="Enter your email"
              onChange={(event) => {
                setEmail(event.target.value);
              }}
            />
          {/* </div> */}

          {/* <div className="border p-3 rounded-lg"> */}
            <input className="border p-3 rounded-lg w-100"
              value={role}
              placeholder="Enter your role"
              onChange={(event) => {
                setRole(event.target.value);
              }}
            />
          {/* </div> */}

          <Link to={"/create-list"}>
            <div
              id="yourDivId1"
              className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
            >
              <button>Create List</button>
            </div>
          </Link>
          <Link to={"/update"}>
            <div
              id="yourDivId2"
              className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
            >
              <button>Update List</button>
            </div>
          </Link>
          <Link to={"/delete"}>
            <div
              id="yourDivId3"
              className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
            >
              <button>Delete List</button>
            </div>
          </Link>
          <Link to={"/liked"}>
            <div
              id="yourDivId4"
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
