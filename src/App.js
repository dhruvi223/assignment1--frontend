import { BrowserRouter, Route, Routes } from 'react-router-dom';
import logo from './logo.svg';
import Home from './Component.js/Home';
import './App.css';
import Navbar from './Component.js/Navbar';
import { useState } from 'react';
import Login from './Component.js/Login';

function App() {

  const [loggedIn, setLoggedIn] = useState(0)
  const [email, setEmail] = useState('')

  return (
    <div className="App">
      <Navbar/>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home email={email} loggedIn={loggedIn} setLoggedIn={setLoggedIn} />}/>
        <Route path="/login" element={<Login email={email} loggedIn={loggedIn} setLoggedIn={setLoggedIn} />}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
