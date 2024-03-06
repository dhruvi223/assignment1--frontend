import React from "react";
import { useNavigate } from "react-router-dom";

const Home = (props) => {
  const { loggedIn, email } = props;
  const navigate = useNavigate();

  // removes user from local storage of browser on clicking log out
  const onButtonClick = () => {
    if (loggedIn) {
      localStorage.removeItem("user");
      props.setLoggedIn(false);
    } else {
      navigate("/login");
    }
  };

  return (
    <div>
      <div className="flex justify-center">
        <div>Welcome!</div>
      </div>
      <div className="flex justify-center">
        <input
          type="button"
          onClick={onButtonClick}
          value={loggedIn ? "Log out" : "Log in"}
        />
      </div>
      <div className="flex justify-center">
        {loggedIn ? <div>Your email address is {email}</div> : <div />}
      </div>
    </div>
  );
};

export default Home;
