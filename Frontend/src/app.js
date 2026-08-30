import "./App.css";
import React, { useState } from "react";
import Auth from "./components/Auth";
import { useEffect } from "react";
import MainComponent from "./components/MainComponent";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { UserProvider } from "./contexts/user.context";
import Home from "./pages/Home.page";
import Login from "./pages/Login.page";
import PrivateRoute from "./pages/PrivateRoute.page";
import Signup from "./pages/Signup.page";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [language, setLanguage] = useState("pl");

  const handleLogin = () => {
    setIsLoggedIn(true);
  };
  console.log(username);

  useEffect(() => {
    if (password === " ") setPassword("");
    if (username == " ") setUsername("");
  });

  return (
    <div className="App">
      {isLoggedIn ? (
        <MainComponent
          username={username}
          password={password}
          setUsername={setUsername}
          setPassword={setPassword}
          setIsLoggedIn={setIsLoggedIn}
          language={language}
          setLanguage={setLanguage}
        />
      ) : (
        <Auth
          onLogin={handleLogin}
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
          language={language}
          setLanguage={setLanguage}
        />
      )}
    </div>
  );
}
export default App;
