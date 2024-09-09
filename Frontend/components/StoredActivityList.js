// import { useQueryClient, useMutation } from "@tanstack/react-query";

// const ActivityList = ({ data }) => {
//   const queryClient = useQueryClient();

//   const handleDeleteTenis = async (id) => {
//     try {
//       await deleteTenisMutation.mutateAsync(id);
//       queryClient.invalidateQueries("tenisData");
//     } catch (error) {
//       console.error("Error deleting tenis:", error);
//     }
//   };

//   const handleCreateTenis = async (newTenisData) => {
//     try {
//       await createTenisMutation.mutateAsync(newTenisData);
//       queryClient.invalidateQueries("tenisData");
//     } catch (error) {
//       console.error("Error creating tenis:", error);
//     }
//   };

//   const deleteTenisMutation = useMutation({
//     mutationFn: deleteTenis,
//     onSuccess: () => {
//       queryClient.invalidateQueries("tenisData");
//     },
//   });

//   const createTenisMutation = useMutation(createTenis, {
//     onSuccess: () => {
//       queryClient.invalidateQueries("tenisData");
//     },
//   });

//   return (
//     <div>
//       <button
//         onClick={() =>
//           handleCreateTenis({
//             /* dane nowego tenisa */
//           })
//         }
//       >
//         Create New Tenis
//       </button>
//       <ul>
//         {data.map((activity) => (
//           <li key={activity._id}>
//             Nazwa: {activity.Name}
//             Czas: {activity.Time}
//             Koszt: {activity.ActivityCost}
//             Transport: {activity.Transport}
//             <button onClick={() => handleDeleteTenis(activity._id)}>x</button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default ActivityList;

// const ActivityList = ({ data }) => {
//   const queryClient = useQueryClient();

//   const handleDeleteTenis = async (id) => {
//     try {
//       await deleteTenisMutation.mutateAsync(id);
//       queryClient.invalidateQueries('tenisData');
//     } catch (error) {
//       console.error('Error deleting tenis:', error);
//     }
//   };

//   const deleteTenisMutation = useMutation({
//     mutationFn: deleteTenis,
//     onSuccess: () => {
//       queryClient.invalidateQueries('tenisData');
//     },
//   });

//   return (
//     <>
//         <h1>historia aktywności</h1>
//       <ul>
//         {data.map((activity) => (
//           <li key={activity._id}>
//             Nazwa: {activity.Name}
//             Czas: {activity.Time}
//             Koszt: {activity.ActivityCost}
//             Transport: {activity.Transport}
//             <button onClick={() => handleDeleteTenis(activity._id)}>x</button>
//           </li>
//         ))}
//       </ul>
//     </>

//   );
// };

// export default ActivityList;
