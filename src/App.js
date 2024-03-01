import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Component/Home";
import "./App.css";
import Navbar from "./Component/Navbar";
import { useEffect, useState } from "react";
import Login from "./Component/Login";
import Register from "./Component/Register";
import Profile from "./Component/Profile";
import CreateList from "./Component/CreateList";
import ShowList from "./Component/ShowList";
import UpdateProduct from "./Component/UpdateProduct";
import DeleteProduct from "./Component/DeleteProduct";
import LikedProduct from "./Component/LikedProduct";
import { Toaster, toast } from 'react-hot-toast';
import { verifyUser } from "./api";


function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [registered, setRegistered] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { loggedIn, email } = await verifyUser();
        setLoggedIn(loggedIn);
        setEmail(email);
      } catch (error) {
      }
    };

    fetchData();


  }, []);

  return (
    <div className="App">
      <Toaster />
      <BrowserRouter>
        <Navbar email={email} loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
        <Routes>
          <Route
            path="/"
            element={
              <Home
                email={email}
                loggedIn={loggedIn}
                setLoggedIn={setLoggedIn}
              />
            }
          />
          <Route
            path="/login"
            element={
              <Login
                email={email}
                loggedIn={loggedIn}
                setLoggedIn={setLoggedIn}
                setEmail={setEmail}
              />
            }
          />
          <Route
            path="/register"
            element={
              <Register
                email={email}
                registered={registered}
                setRegistered={setRegistered}
                setEmail={setEmail}
              />
            }
          />
          <Route path="/profile" element={<Profile />} />
          <Route path="/create-list" element={<CreateList />} />
          <Route path="/show-list" element={<ShowList />} />
          <Route path="/update" element={<UpdateProduct />} />
          <Route path="/delete" element={<DeleteProduct />} />
          <Route path="/liked" element={<LikedProduct />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
