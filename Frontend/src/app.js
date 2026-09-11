import "./App.css";
import React, { useState } from "react";
import Auth from "./components/Auth";
import { useEffect } from "react";
import MainComponent from "./components/MainComponent";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [language, setLanguage] = useState("pl");
  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem("sms-sport-theme") === "dark" ? "dark" : "light";
    } catch {
      return "light";
    }
  });

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.dataset.bsTheme = theme;
    try {
      localStorage.setItem("sms-sport-theme", theme);
    } catch {
      // Switching themes still works when browser storage is unavailable.
    }
  }, [theme]);

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
          theme={theme}
          setTheme={setTheme}
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
