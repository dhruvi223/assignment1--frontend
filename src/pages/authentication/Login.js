import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { toast } from 'react-hot-toast';
import { loginUser } from "../../redux/actions/productActions";
import { useDispatch } from 'react-redux';
import { emailMessages, passwordMessages } from "../../constants/messages";

const Login = (props) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();
  const onButtonClick = () => {
    setEmailError("");
    setPasswordError("");

    if (email === "") {
      setEmailError(emailMessages.empty);
    }
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
      setEmailError(emailMessages.invalid);
    }

    if (password === "") {
      setPasswordError(passwordMessages.empty);
    }

    if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,32}$/.test(password)) {
      setPasswordError(passwordMessages.weak);
      return;
    }


    Loggin();
  
  };

  const Loggin = async () => {
    try {
      await dispatch(loginUser(email, password, props, navigate, toast));
    } catch (error) {
    }



  };


  return (
    <div className="p-3 max-w-lg mx-auto">
      <div className="main">
        <div className="title">
          <h1 className="text-3xl text-center font-semibold my-7">Login</h1>
        </div>

        <div className="flex flex-col gap-4">
          <div>
              <input className="border p-3 rounded-lg w-100"
                value={email}
                placeholder="Enter your email"
                onChange={(event) => {
                  setEmail(event.target.value);
                }}
              />
            <label className="block text-xs text-red-700 text-left">
              {emailError}
            </label>
          </div>

          <div>
              <input 
                type = "password"
                className="border p-3 rounded-lg w-100"
                value={password}
                placeholder="Enter your password"
                onChange={(event) => {
                  setPassword(event.target.value);
                }}
              />
            <label className="block text-xs text-red-700 text-left ">
              {passwordError}
            </label>
          </div>

          <div className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
            <button onClick={onButtonClick}>Login</button>
          </div>
        </div>

        <div className="flex gap-2 mt-5">
          <p>Dont have an account?</p>
          <Link to={"/register"}>
            <span className="text-blue-700">Sign up</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
