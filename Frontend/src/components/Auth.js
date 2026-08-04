import React, { useState, useEffect } from "react";
import "../App.css";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { createUser } from "./userApi";
import { fetchData } from "./userApi";

// const fetchData = async () => {
//   const response = await fetch('/api/user');
//   if (!response.ok) {
//     throw new Error("Network response was not ok");
//   }
//   return response.json();
// };

// const checkUserExists = async (username) => {
//     const response = await fetch(`/api/user/${username}`, {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });

//     if (!response.ok) {
//       throw new Error("Failed to check if user exists");
//     }

//     const data = await response.json();
//     return data.exists;
//   };

// const createUser = async (user) => {
//   const response = await fetch('/api/user',  {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(user),
//   });
//   if (!response.ok) {
//     throw new Error("Failed to create tenis");
//   }
//   return response.json();
// };
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

  // const addUserIfNotExists = async (username, user) => {
  //   try {
  //     const userExists = await checkUserExists(username);
  //     if (!userExists) {
  //       createUserMutation.mutate(user);
  //     } else {
  //       console.log('User already exists');
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  // useEffect(() => {
  //     const handleAddUser = async () => {
  //       const username = username; // replace with actual username
  //       const user = { username, password:'' }; // replace with actual user data
  //       await addUserIfNotExists(username, user);
  //     };

  //     handleAddUser();
  // },[])

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
      {/* <h1>user Data</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error.message}</p>
      ) : (
        <div>
          <pre>{JSON.stringify(data, null, 2)}</pre>
          <button onClick={handleAddUser}>Add User</button>
        </div>
      )} */}
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
