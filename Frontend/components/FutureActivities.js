
// import React, { useEffect, useState } from "react";

// const FutureActivities =({data, handleDelete})=>{

// return (<>przyszłe aktywności
//         {data.slice(0).filter(activity=> new Date(activity.Date)>new Date).map((activity) => (
           
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
// </>)

// }; export default FutureActivities;