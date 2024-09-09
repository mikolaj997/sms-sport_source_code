// import {
//     useQuery,
//     useMutation,
//     useQueryClient,
//     QueryClient,
//     QueryClientProvider,
//   } from '@tanstack/react-query'
  
// const ServerConnection = ({selectedSport}) => {
//     console.log(selectedSport);
//     const saveDataToServer = async (data) => {
//         try {
//           const response = await fetch("http://localhost:3001/api/tenis", {
//             method: "POST",
//             headers: {
//               "Content-Type": "application/json",
//             },
//             body: JSON.stringify(data),
//           });
      
//           if (!response.ok) {
//             throw new Error("Failed to save data to server");
//           }
      
//           console.log("Data saved successfully");
//         } catch (error) {
//           console.error("Error saving data:", error);
//         }
//       };

//   const fetchData = async () => {
//     const response = await fetch("/api/tenis");
//     if (!response.ok) {
//       throw new Error("Network response was not ok");
//     }
//     return response.json();
//   };

//   const { data, isLoading, error } = useQuery({
//     queryKey: "myData",
//     queryFn: fetchData,
//   });
//   if (isLoading) return <div>Loading... </div>;
//   if (error) return <div>Error: {error.message}
//   </div>;
  
//   return (
//   <div>
//     <button onClick={() => saveDataToServer(selectedSport)}>add</button>
    
//     <ul>
//         {data.map((tenis) => (
//           <li key={tenis._id}>
//             {tenis.Name} - {tenis.country} - {tenis.age} - {tenis.rank}
//           </li>
//         ))}
//       </ul>
//     </div>
// );
// };
// export default ServerConnection;