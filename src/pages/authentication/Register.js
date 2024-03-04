import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { toast } from 'react-hot-toast';
import { registerUser } from "../../api";

const Register = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();

  const onButtonClick = (event) => {
    event.preventDefault();
    setEmailError("");
    setPasswordError("");
    
    // validation
    if (email === "") {
      setEmailError("Please enter your email");
    }
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
      setEmailError("Invalid Email address ");
    }

    if (password === "") {
      setPasswordError("Please enter your password");
    }

    if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,32}$/.test(password)) {
      setPasswordError("Password is weak");
      return;
    }
    Register();
  };

  const Register = () => {
    registerUser(email, password, role, props, navigate, toast);
  }

  return (
    <div className="p-3 max-w-lg mx-auto">
      <div className="title">
        <h1 className="text-3xl text-center font-semibold my-7">Register</h1>
      </div>

      <form className="flex flex-col gap-4">

        <div>
          <input className="border p-3 rounded-lg w-100"
            value={email}
            placeholder="Enter your email"
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          />
          <label className="block text-xs text-red-700 text-left p-0">
            {emailError}
          </label>
        </div>

        <div>
          <input className="border p-3 rounded-lg w-100"
            value={password}
            placeholder="Enter your password"
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />
          <label className="block text-xs text-red-700 text-left p-0">
            {passwordError}
          </label>
        </div>

        <div>
          <input className="border p-3 rounded-lg w-100"
            value={role}
            placeholder="Enter your role"
            onChange={(event) => {
              setRole(event.target.value);
            }}
          />
        </div>

        <div className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
          <button onClick={onButtonClick}>Register</button>
        </div>
      </form>

      <div className="flex gap-2 mt-5">
        <p>Already have an account</p>
        <Link to={"/login"}>
          <span className="text-blue-700">Sign In</span>
        </Link>
      </div>
    </div>
  );
};

export default Register;