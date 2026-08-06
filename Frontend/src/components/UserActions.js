// export const fetchData = async () => {
//     const response = await fetch('/api/user');
//     if (!response.ok) {
//       throw new Error("Network response was not ok");
//     }
//     return response.json(); 
//   };
// export const checkUserExists = async (username) => {
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
// export const createUser = async (user) => {
//     const response = await fetch('/api/user',  {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(user),
//     });
//     if (!response.ok) {
//       throw new Error("Failed to create tenis");
//     }
//     return response.json();
//   };
  
