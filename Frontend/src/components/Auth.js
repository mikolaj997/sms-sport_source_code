import React, { useState, useEffect } from "react";
import "../App.css";
import { createUser } from "./userApi";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchData } from "./userApi";
import translations from "./translations";

const Auth = ({
  onLogin,
  username,
  setUsername,
  password,
  setPassword,
  language,
  setLanguage,
}) => {
  const queryClient = useQueryClient();
  const { data } = useQuery({ queryKey: ["userData"], queryFn: fetchData });
  const createUserMutation = useMutation({
    mutationFn: createUser,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["userData"] }),
  });
  const handleAddUser = async (username, password) => {
    try {
      await createUserMutation.mutateAsync({ Name: username, Password: password });
      alert(language === "pl" ? "Konto utworzone. Możesz się zalogować." : "Account created. You can now log in.");
    } catch (error) {
      alert(language === "pl" ? "Nie udało się utworzyć konta. Sprawdź login, hasło i połączenie z serwerem." : "Could not create account. Check your username, password and server connection.");
    }
  };
  let userValid;
  const handleLogin = () => {
    if (
      (username === "admin" && password === "admin") ||
      (username === "xyz" && password === "123") ||
      (username === "xxx" && password === "123") ||
      (username === "yyy" && password === "123") ||
      (username === "zzz" && password === "123")
    ) {
      onLogin();
    } else if ((username == "" && password === "") || userValid) {
      onLogin();
    } else {
      alert("Invalid username or password");
    }
    console.log(username);
  };
  useEffect(() => {
    if (data) userValid = data.find((user) => user.Name === username && user.Password === password);
  }, [password, handleLogin]);
  return (
    <>
      <div className="auth-container">
        <div className="auth-card">
          <button
            className="language-btn"
            onClick={() => setLanguage(language === "pl" ? "en" : "pl")}
          >
            {language === "pl" ? "EN" : "PL"}
          </button>
          <h1> SMS-Sport</h1>

          <p className="auth-subtitle">{translations[language].login}</p>

          <div className="credentials">
            <input
              type="text"
              placeholder={translations[language].username}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

            <input
              type="password"
              placeholder={translations[language].password}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            
            <div className="creBtns">
              <button className="login-btn" onClick={handleLogin}>
                {translations[language].login}
              </button>

              <button
                className="register-btn"
                type="button" disabled={createUserMutation.isPending} onClick={() => handleAddUser(username, password)}
              >
                {translations[language].register}
              </button>

              <button className="guest-btn" onClick={handleLogin}>
                {translations[language].continueWithoutLogin}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Auth;
