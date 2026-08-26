import React, { useState, useEffect } from "react";
import "../App.css";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { createUser } from "./userApi";
import { fetchData } from "./userApi";


const Auth = ({ onLogin, username, setUsername, password, setPassword }) => {
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: "userData",
    queryFn: fetchData,
  });

  const createUserMutation = useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      queryClient.invalidateQueries("userData");
    },
  });

  

  const handleAddUser = async (username, password) => {
    const user = { Name: username, Password: password }; // do dodsnia w przyszłości TransportType: selectedTransportType
    await createUserMutation.mutate(user);
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
  if (data)
    userValid = data.find(
      (user) => user.Name === username && user.Password === password
    );
  }, [password, handleLogin]);
  return (
    <>
      
      <div className="credentials">
        <>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </>

        <div className="creBtns">
          <button onClick={handleLogin}>zaloguj</button>
          <button onClick={() => handleAddUser(username, password)}>
            zarejestruj
          </button>
          <button onClick={handleLogin}>kontunuuj bez logowania</button>
        </div>
      </div>
    </>
  );
};

export default Auth;
