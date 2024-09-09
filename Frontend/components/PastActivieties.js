// import React, { useEffect, useState } from "react";
// import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

// const fetchData = async () => {
//   const response = await fetch("/api/tenis");
//   if (!response.ok) {
//     throw new Error("Network response was not ok");
//   }
//   return response.json();
// };

// const createTenis = async (newTenis) => {
//   const response = await fetch("/api/tenis", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(newTenis),
//   });
//   if (!response.ok) {
//     throw new Error("Failed to create tenis");
//   }
//   return response.json();
// };
// const deleteTenis = async (id) => {
//   const response = await fetch(`/api/tenis/${id}`, {
//     method: "DELETE",
//   });
// };
// const deleteAllData = async () => {
//   const response = await fetch(`/api/tenis`, {
//     method: "DELETE",
//   });
// };

// const PastActivities = ({
//   selectedSport,
//   activityTime,
//   totalCalories,
//   totalCalorieCost,
//   travelTime,
//   price,
//   storedDistanceInKm,
//   kindOfTransport,
//   click,
//   date,
//   ifPlaned,
//   planned,
//   past,
//   all,
// }) => {
//   const queryClient = useQueryClient();
//   const { data, isLoading, error } = useQuery({
//     queryKey: "tenisData",
//     queryFn: fetchData,
//   });

//   const createTenisMutation = useMutation({
//     mutationFn: createTenis,
//     onSuccess: () => {
//       queryClient.invalidateQueries("tenisData");
//     },
//   });
//   const deleteTenisMutation = useMutation({
//     mutationFn: deleteTenis,
//     onSuccess: () => {
//       queryClient.invalidateQueries("tenisData");
//     },
//   });
//   const deleteTAllMutation = useMutation({
//     mutationFn: deleteAllData,
//     onSuccess: () => {
//       queryClient.invalidateQueries("tenisData");
//     },
//   });
//   const handleCreateActivity = async () => {
//     try {
//       await createTenisMutation.mutateAsync({
//         Date: new Date(),
//         Name: `${selectedSport}`,
//         Time: activityTime,
//         ActivityCost: price,
//         Transport: kindOfTransport,
//         Calories: totalCalories,
//         CalorieCost: totalCalorieCost,
//       });
//     } catch (error) {
//       console.error("Error creating tenis:", error);
//     }
//   };
//   const handleDelete = async (id) => {
//     try {
//       await deleteTenisMutation.mutateAsync(id);
//     } catch (error) {
//       console.error("Error deleting tenis:", error);
//     }
//   };
//   const handleDeleteAll = async () => {
//     try {
//       const response = await fetch("/api/tenis", {
//         method: "DELETE",
//       });
//       if (!response.ok) {
//         throw new Error("Failed to delete all records");
//       }
//       // Aktualizacja danych w React Query po usunięciu rekordów
//       queryClient.invalidateQueries("tenisData");
//     } catch (error) {
//       console.error("Error deleting all records:", error);
//     }
//   };

//   let isBefore = false;
//   let isAfter = false;

//   const hour = date.getHours();
//   const minutes = date.getMinutes();
//   const days = date.getDate();
//   const month = date.getMonth() + 1;
//   const year = date.getFullYear();

//   const formattedDate = `${hour}:${minutes} ${days}/${month}/${year}`;

//   console.log(past, planned, "past/planned");

//   const now = new Date();
//   if (
//     date.getFullYear() < now.getFullYear() ||
//     (date.getFullYear() === now.getFullYear() &&
//       date.getMonth() < now.getMonth()) ||
//     (date.getFullYear() === now.getFullYear() &&
//       date.getMonth() === now.getMonth() &&
//       date.getDate() < now.getDate()) ||
//     (date.getFullYear() === now.getFullYear() &&
//       date.getMonth() === now.getMonth() &&
//       date.getDate() === now.getDate() &&
//       date.getHours() < now.getHours()) ||
//     (date.getFullYear() === now.getFullYear() &&
//       date.getMonth() === now.getMonth() &&
//       date.getDate() === now.getDate() &&
//       date.getHours() === now.getHours() &&
//       date.getMinutes() < now.getMinutes())
//   ) {
//     isBefore = true;
//     console.log("Wybrana data jest wcześniejsza od dzisiejszej daty.");
//   } else {
//     isAfter = true;
//     console.log("Wybrana data nie jest wcześniejsza od dzisiejszej daty.");
//   }
//   console.log(new Date(date) < new Date(), "isAfter");

//   if (isLoading) return <div>Loading...</div>;
//   if (error) return <div>Error: {error.message}</div>;

//   const activity = document.getElementById("#activity");
//   console.log("aktywnoś", activity);
//   const data2 = data.slice(0);
//   const data3 = data.slice(0);
  
//   return (
//     <>
//       przeszłe aktywności
//       {data2
//         .slice(0)
//         .filter((activity) => new Date(activity.Date) < new Date())
//         .map((activity) => (
//           <li key={activity._id}>
//             data: {`${activity.Date} `}
//             Nazwa: {`${activity.Name}, `}
//             Czas: {`${activity.Time}, `}
//             Koszt: {`${activity.ActivityCost}, `}
//             Transport: {`${activity.Transport}, `}
//             Kalorie: {`${activity.Calories}, `}
//             Koszt Kalorii: {`${activity.CalorieCost}, `}
//             status: {`${activity.ifPlaned}, `}
//             <button onClick={() => handleDelete(activity._id)}>Usuń</button>
//           </li>
//         ))}
//     </>
//   );
// };
// export default PastActivities;
