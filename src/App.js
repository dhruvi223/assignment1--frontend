import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import { useEffect, useState } from "react";
import Login from "./pages/authentication/Login";
import Register from "./pages/authentication/Register";
import Profile from "./pages/Profile";
import CreateList from "./pages/CreateList";
import ShowList from "./pages/ShowList";
import UpdateProduct from "./pages/UpdateProduct";
import DeleteProduct from "./pages/DeleteProduct";
import LikedProduct from "./pages/LikedProduct";
import { Toaster, toast } from 'react-hot-toast';
import { verifyToken } from "./redux/actions/productActions";
import './assets/styles/App.css'
import { useDispatch } from 'react-redux';


function App() {
  const dispatch = useDispatch();
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [registered, setRegistered] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await dispatch(verifyToken());
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
