import React, { useEffect, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import ActivityList from "./StoredActivityList";
import FutureActivities from "./FutureActivities";
import PastActivities from "./PastActivieties";

// const UpdateDb = ({
//       selectedSport,
//       activityTime,
//       totalCalories,
//       travelTime,
//       price,
//       storedDistanceInKm,
//       kindOfTransport,
//     }) => {
//       const queryClient = useQueryClient();
//       const { data, isLoading, error } = useQuery({
//         queryKey: "tenisData",
//         queryFn: fetchData,
//       });

//       const createTenisMutation = useMutation({
//         mutationFn: createTenis,
//         onSuccess: () => {
//           queryClient.invalidateQueries("tenisData");
//         },
//       });

//       const handleCreateActivity = async () => {
//         try {
//           await createTenisMutation.mutateAsync({
//             Name: `${selectedSport}`,
//             Time: activityTime,
//             ActivityCost: price,
//             Transport: kindOfTransport == 'driving'? 'samochód':kindOfTransport,
//           });
//         } catch (error) {
//           console.error("Error creating tenis:", error);
//         }
//       };

//       if (isLoading) return <div>Loading...</div>;
//       if (error) return <div>Error: {error.message}</div>;

//       return (
//         <div>
//             <ActivityList data={data}></ActivityList>

//           <button onClick={handleCreateActivity}>Create Tenis</button>
//         </div>
//       );
//     };

//     export default UpdateDb;

const fetchData = async () => {
  const response = await fetch("/api/activity");
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json(); 
};

const createTenis = async (newTenis) => {
  const response = await fetch("/api/activity", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newTenis),
  });
  if (!response.ok) {
    throw new Error("Failed to create activity");
  }
  return response.json();
};
const deleteTenis = async (id) => {
  const response = await fetch(`/api/activity/${id}`, {
    method: "DELETE",
  });
};
const deleteAllData = async () => {
  const response = await fetch(`/api/activity`, {
    method: "DELETE",
  });
};


const UpdateDb = ({
  selectedSport,
  activityTime,
  totalCalories,
  totalCalorieCost,
  travelTime,
  price,
  storedDistanceInKm,
  kindOfTransport,
  click,
  date,
  ifPlaned,
  planned,
  past,
  all,
  username,
  storedDataFuture,
  storedDataPast

}) => {
  useEffect(() => {
    
  }, [past,planned])
  // const [click, setClick] = useState(0)
  const queryClient = useQueryClient();
  const { data, isLoading, error } = useQuery({
    queryKey: "activityData",
    queryFn: fetchData,
  });
  

  const createTenisMutation = useMutation({
    mutationFn: createTenis,
    onSuccess: () => {
      queryClient.invalidateQueries("activityData");
    },
  });
  const deleteTenisMutation = useMutation({
    mutationFn: deleteTenis,
    onSuccess: () => {
      queryClient.invalidateQueries("activityData");
    },
  });
  const deleteTAllMutation = useMutation({
    mutationFn: deleteAllData,
    onSuccess: () => {
      queryClient.invalidateQueries("activityData");
    },
  });
  const handleCreateActivity = async () => {
    try {
      await createTenisMutation.mutateAsync({
        Date: new Date(),
        Name: `${selectedSport}`,
        Time: activityTime,
        ActivityCost: price,
        Transport: kindOfTransport,
        Calories: totalCalories,
        CalorieCost: totalCalorieCost,
      });
    } catch (error) {
      console.error("Error creating activity:", error);
    }
  };
  //   async function deleteRecord(id) {
  //     await fetch(`http://localhost:5050/api/tenis/${id}`, {
  //       method: "DELETE",
  //     });
  //     const newRecords = id.filter((el) => el._id !== id);

  //   }
  const handleDelete = async (id) => {
    try {
      await deleteTenisMutation.mutateAsync(id);
    } catch (error) {
      console.error("Error deleting tenis:", error);
    }
  };
  //   const handleDeleteAll = async () => {
  //     try {
  //       await deleteTAllMutation.mutateAsync();
  //     } catch (error) {
  //       console.error("Error deleting tenis:", error);
  //     }
  //   };

  const handleDeleteAll = async () => {
    try {
      const response = await fetch("/api/activity", {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete all records");
      }
      // Aktualizacja danych w React Query po usunięciu rekordów
      queryClient.invalidateQueries("activityData");
    } catch (error) {
      console.error("Error deleting all records:", error);
    }
  };

  let isBefore = false;
  let isAfter = false;

  const hour = date.getHours();
  const minutes = date.getMinutes();
  const days = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  const formattedDate = `${hour}:${minutes} ${days}/${month}/${year}`;

  console.log(past,planned,'past/planned');

  const now = new Date();
  if (
    date.getFullYear() < now.getFullYear() ||
    (date.getFullYear() === now.getFullYear() &&
      date.getMonth() < now.getMonth()) ||
    (date.getFullYear() === now.getFullYear() &&
      date.getMonth() === now.getMonth() &&
      date.getDate() < now.getDate()) ||
    (date.getFullYear() === now.getFullYear() &&
      date.getMonth() === now.getMonth() &&
      date.getDate() === now.getDate() &&
      date.getHours() < now.getHours()) ||
    (date.getFullYear() === now.getFullYear() &&
      date.getMonth() === now.getMonth() &&
      date.getDate() === now.getDate() &&
      date.getHours() === now.getHours() &&
      date.getMinutes() < now.getMinutes())
  ) {
    isBefore = true;
    console.log("Wybrana data jest wcześniejsza od dzisiejszej daty.");
  } else {
    isAfter = true;
    console.log("Wybrana data nie jest wcześniejsza od dzisiejszej daty.");
  }
  console.log(new Date(date)<new Date(),'isAfter');
  // Dane do sortowania

 // Funkcja do sortowania danych po dacie
 

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;


  
  
  const parseDateFromString = (dateString) => {
      const [time, date] = dateString.split(' ');
      const [hour, minute] = time.split(':');
      const [day, month, year] = date.split('/');
      return new Date(year, month - 1, day, hour, minute); // Uwaga: Miesiące są indeksowane od 0, stąd month - 1
    };
    
    const sortedData = data.sort((a, b) => {
        const dateA = parseDateFromString(a.Date);
        const dateB = parseDateFromString(b.Date);
       
        return dateA - dateB;
    });

    storedDataFuture = storedDataFuture.filter(a=>parseDateFromString(a.Date)>new Date()).filter(a=>{
      if(username=='admin'){
        return a
      }else{
        return a.User==username
      }
      })

    storedDataPast = storedDataPast.filter(a=>parseDateFromString(a.Date)<new Date()).filter(a=>{
      if(username=='admin'){
        return a
      }else{
        return a.User==username
      }
      })

    // Wyświetl posortowane dane
    let displayData;
    const userData = sortedData.filter(a=>{
      if(username=='admin'){
        return a
      }else{
        return a.User==username
      }
      }
    );
      console.log(userData);
    
    const today = new Date();
    displayData = sortedData.map((activity) => (
            
        <li key={activity._id}>
        data: {`${activity.Date} `}
        Nazwa: {`${activity.Name}, `}
        Czas: {`${activity.Time}, `}
        Koszt: {`${activity.ActivityCost}, `}
        Transport: {`${activity.Transport}, `}
        Kalorie: {`${activity.Calories}, `}
        Koszt Kalorii: {`${activity.CalorieCost}, `}
       
      
        <button onClick={() => handleDelete(activity._id)}>Usuń</button>
      </li>
    ))

    // parseDateFromString(sortedData.map(a=>a.Data))

//   const activity = document.getElementById('#activity')
//   console.log('aktywnoś',activity)
//   const data2 = data.slice(0)
//   const data3 = data.slice(0)
//   console.log(planned);
//   const sortedActivities = data.sort((a,b)=>new Date(a.Date) - new Date(b.Date))
  return (
    
    <div className="data-from-db">
      <ul>
      {planned &&<>przyszłe aktywności</>}

{planned && storedDataFuture.map((activity) => (
  
  <li key={activity._id}>
    Data: {`${activity.Date} `}
    Nazwa: {`${ activity.Name.includes("Tennis")
    ? `${activity.Name.split(" ")[0].slice(0, -1)} ${
        activity.Name.split(" ")[1] == "singles"
          ? "(singiel)"
          : activity.Name.split(" ")[1] == "doubles"
          ? "(debel)"
          : ""
      }`
    : activity.Name.includes("Running")
    ? `${
        activity.Name.split(" ")[0].slice(0, -1) ==
        "Running"
          ? "bieganie"
          : ""
      }(${
        activity.Name
          .slice(activity.Name.split(" ")[1])
          .trim() == "8 mph (7.5 min/mile)"
          ? "12,9 km/h"
          : !activity.Name.includes("general")
          ? "16,1 km/h"
          : "średnim tempem"
      })`
    : activity.Name.includes("Cycling")
    ? `${
        activity.Name.split(" ")[0].slice(0, -1) ==
        "Cycling"
          ? "rower"
          : ""
      }(${
        activity.Name
          .slice(activity.Name.split(" ")[1])
          .trim() == "12-13.9mph, moderate"
          ? "rower, 19.3-22.4km/h"
          : activity.Name
              .slice(activity.Name.split(" ")[1])
              .trim() == "Cycling, 10-11.9mph, light"
          ? "rower, 16.1-19.2km/h"
          : "rower, 22.5-25.6km/h"
      })`
    : activity.Name === "Squash"
    ? `${activity.Name}`
    : activity.Name === "Table tennis, ping pong"
    ? `tenis stolowy`
    : activity.Name === "Paddleball, competitive"
    ? `${activity.Name.split(" ")[0].slice(0, -8)}el`
    : activity.Name === "Badminton"
    ? `${activity.Name}`
    : activity.Name === "Running, general"
    ? `${
        activity.Name.split(" ")[0].slice(0, -1) == "Running"
          ? "bieganie"
          : ""
      }`
    : activity.Name === "Cycling, 12-13.9mph, moderate"
    ? `${
        activity.Name.split(" ")[0].slice(0, -1) == "Cycling"
          ? "rower"
          : ""
      }`
    : activity.Name
}  `}
    Czas: {`${activity.Time}, `}
    Koszt: {`${activity.ActivityCost}, `}
    Transport: {`${activity.Transport=='cycling'?'rower':activity.Transport=='driving'?'samochod':'pieszo'}, `}
    Kalorie: {`${activity.Calories}, `}
    Koszt Kalorii: {`${activity.CalorieCost} `}
    {/* user: {`${activity.User
}`} */}
  
    <button onClick={() => handleDelete(activity._id)}>Usuń</button>
  </li>
))}
</ul>

      <ul>
      {past && <>przeszłe aktywności</>}

{past && storedDataPast.map((activity) => (
  
  <li key={activity._id}>
    Data: {`${activity.Date} `}
    Nazwa: {`${ activity.Name.includes("Tennis")
    ? `${activity.Name.split(" ")[0].slice(0, -1)} ${
        activity.Name.split(" ")[1] == "singles"
          ? "(singiel)"
          : activity.Name.split(" ")[1] == "doubles"
          ? "(debel)"
          : ""
      }`
    : activity.Name.includes("Running")
    ? `${
        activity.Name.split(" ")[0].slice(0, -1) ==
        "Running"
          ? "bieganie"
          : ""
      }(${
        activity.Name
          .slice(activity.Name.split(" ")[1])
          .trim() == "8 mph (7.5 min/mile)"
          ? "12,9 km/h"
          : !activity.Name.includes("general")
          ? "16,1 km/h"
          : "średnim tempem"
      })`
    : activity.Name.includes("Cycling")
    ? `${
        activity.Name.split(" ")[0].slice(0, -1) ==
        "Cycling"
          ? "rower"
          : ""
      }(${
        activity.Name
          .slice(activity.Name.split(" ")[1])
          .trim() == "12-13.9mph, moderate"
          ? "rower, 19.3-22.4km/h"
          : activity.Name
              .slice(activity.Name.split(" ")[1])
              .trim() == "Cycling, 10-11.9mph, light"
          ? "rower, 16.1-19.2km/h"
          : "rower, 22.5-25.6km/h"
      })`
    : activity.Name === "Squash"
    ? `${activity.Name}`
    : activity.Name === "Table tennis, ping pong"
    ? `tenis stolowy`
    : activity.Name === "Paddleball, competitive"
    ? `${activity.Name.split(" ")[0].slice(0, -8)}el`
    : activity.Name === "Badminton"
    ? `${activity.Name}`
    : activity.Name === "Running, general"
    ? `${
        activity.Name.split(" ")[0].slice(0, -1) == "Running"
          ? "bieganie"
          : ""
      }`
    : activity.Name === "Cycling, 12-13.9mph, moderate"
    ? `${
        activity.Name.split(" ")[0].slice(0, -1) == "Cycling"
          ? "rower"
          : ""
      }`
    : activity.Name
}  `}
    Czas: {`${activity.Time}, `}
    Koszt: {`${activity.ActivityCost}, `}
    Transport: {`${activity.Transport=='cycling'?'rower':activity.Transport=='driving'?'samochod':'pieszo'}, `}
    Kalorie: {`${activity.Calories}, `}
    Koszt Kalorii: {`${activity.CalorieCost} `}
    {/* user: {`${activity.User
}`} */}
  
    <button onClick={() => handleDelete(activity._id)}>Usuń</button>
  </li>
))}
</ul>
      {/* <ActivityList data={data}></ActivityList> */}
      <ul>
      {/* <>aktywności przeszłe:</> */}
        {/* {isBefore &&
          data.map((activity) => (
            <>
              
              <li key={activity._id}>
                data: {`${activity.Date} `}
                Nazwa: {`${activity.Name}, `}
                Czas: {`${activity.Time}, `}
                Koszt: {`${activity.ActivityCost}, `}
                Transport: {`${activity.Transport}, `}
                Kalorie: {`${activity.Calories}, `}
                Koszt Kalorii: {`${activity.CalorieCost}, `}
                status: {`${activity.ifPlaned}, `}
                
                <button onClick={() => handleDelete(activity._id)}>Usuń</button>
              </li>
            </>
          ))}
          <>aktywności przyszłe</>
        {data.ifPlaned ||
          data.map((activity) => (
            <>
              <>aktywności przyszłeTak</>
              <li key={activity._id}>
                data: {`${activity.Date} `}
                Nazwa: {`${activity.Name}, `}
                Czas: {`${activity.Time}, `}
                Koszt: {`${activity.ActivityCost}, `}
                Transport: {`${activity.Transport}, `}
                Kalorie: {`${activity.Calories}, `}
                Koszt Kalorii: {`${activity.CalorieCost}, `}
                status: {`${ifPlaned}, `}
               
                <button onClick={() => handleDelete(activity._id)}>Usuń</button>
              </li>
            </>
          ))}
          <>wszystkie aktywności</>
        {data.map((activity) => (
           activity.ifPlaned?
          <li key={activity._id}>
            data: {`${activity.Date} `}
            Nazwa: {`${activity.Name}, `}
            Czas: {`${activity.Time}, `}
            Koszt: {`${activity.ActivityCost}, `}
            Transport: {`${activity.Transport}, `}
            Kalorie: {`${activity.Calories}, `}
            Koszt Kalorii: {`${activity.CalorieCost}, `}
            status: {`${activity.ifPlaned}, `}
          
            <button onClick={() => handleDelete(activity._id)}>Usuń</button>
          </li>:<></>
        ))} */}

       {/* { planned && <FutureActivities data={data2} handleDelete={handleDelete}></FutureActivities>}
        
        {past&&<PastActivities  data={data3} handleDelete={handleDelete}></PastActivities>} */}

{all &&<>wszystkie aktywności</>}

        {all && userData.map((activity) => (
          
          <li key={activity._id}>
            Data: {`${activity.Date} `}
            Nazwa: {`${ activity.Name.includes("Tennis")
            ? `${activity.Name.split(" ")[0].slice(0, -1)} ${
                activity.Name.split(" ")[1] == "singles"
                  ? "(singiel)"
                  : activity.Name.split(" ")[1] == "doubles"
                  ? "(debel)"
                  : ""
              }`
            : activity.Name.includes("Running")
            ? `${
                activity.Name.split(" ")[0].slice(0, -1) ==
                "Running"
                  ? "bieganie"
                  : ""
              }(${
                activity.Name
                  .slice(activity.Name.split(" ")[1])
                  .trim() == "8 mph (7.5 min/mile)"
                  ? "12,9 km/h"
                  : !activity.Name.includes("general")
                  ? "16,1 km/h"
                  : "średnim tempem"
              })`
            : activity.Name.includes("Cycling")
            ? `${
                activity.Name.split(" ")[0].slice(0, -1) ==
                "Cycling"
                  ? "rower"
                  : ""
              }(${
                activity.Name
                  .slice(activity.Name.split(" ")[1])
                  .trim() == "12-13.9mph, moderate"
                  ? "rower, 19.3-22.4km/h"
                  : activity.Name
                      .slice(activity.Name.split(" ")[1])
                      .trim() == "Cycling, 10-11.9mph, light"
                  ? "rower, 16.1-19.2km/h"
                  : "rower, 22.5-25.6km/h"
              })`
            : activity.Name === "Squash"
            ? `${activity.Name}`
            : activity.Name === "Table tennis, ping pong"
            ? `tenis stolowy`
            : activity.Name === "Paddleball, competitive"
            ? `${activity.Name.split(" ")[0].slice(0, -8)}el`
            : activity.Name === "Badminton"
            ? `${activity.Name}`
            : activity.Name === "Running, general"
            ? `${
                activity.Name.split(" ")[0].slice(0, -1) == "Running"
                  ? "bieganie"
                  : ""
              }`
            : activity.Name === "Cycling, 12-13.9mph, moderate"
            ? `${
                activity.Name.split(" ")[0].slice(0, -1) == "Cycling"
                  ? "rower"
                  : ""
              }`
            : activity.Name
        }  `}
            Czas: {`${activity.Time}, `}
            Koszt: {`${activity.ActivityCost}, `}
            Transport: {`${activity.Transport=='cycling'?'rower':activity.Transport=='driving'?'samochod':'pieszo'}, `}
            Kalorie: {`${activity.Calories}, `}
            Koszt Kalorii: {`${activity.CalorieCost} `}
            {/* user: {`${activity.User
        }`} */}
          
            <button onClick={() => handleDelete(activity._id)}>Usuń</button>
          </li>
))}
      </ul>



      {/* {date.getFullYear() < now.getFullYear() ||
        (date.getFullYear() === now.getFullYear() &&
          date.getMonth() < now.getMonth()) ||
        (date.getFullYear() === now.getFullYear() &&
          date.getMonth() === now.getMonth() &&
          date.getDate() < now.getDate()) ||
        (date.getFullYear() === now.getFullYear() &&
          date.getMonth() === now.getMonth() &&
          date.getDate() === now.getDate() &&
          date.getHours() < now.getHours()) ||
        (date.getFullYear() === now.getFullYear() &&
          date.getMonth() === now.getMonth() &&
          date.getDate() === now.getDate() &&
          date.getHours() === now.getHours() &&
          date.getMinutes() < now.getMinutes())
        &&
        data.map((activity) => (
            <>
              <>aktywności przyszłe</>
              <li key={activity._id}>
                data: {`${activity.Date} `}
                Nazwa: {`${activity.Name}, `}
                Czas: {`${activity.Time}, `}
                Koszt: {`${activity.ActivityCost}, `}
                Transport: {`${activity.Transport}, `}
                Kalorie: {`${activity.Calories}, `}
                Koszt Kalorii: {`${activity.CalorieCost}, `}
                status: {`${ifPlaned}, `}
               
                <button onClick={() => handleDelete(activity._id)}>Usuń</button>
              </li>
            </>
        ))
        
        
        }

        {!(date.getFullYear() < now.getFullYear() ||
        (date.getFullYear() === now.getFullYear() &&
          date.getMonth() < now.getMonth()) ||
        (date.getFullYear() === now.getFullYear() &&
          date.getMonth() === now.getMonth() &&
          date.getDate() < now.getDate()) ||
        (date.getFullYear() === now.getFullYear() &&
          date.getMonth() === now.getMonth() &&
          date.getDate() === now.getDate() &&
          date.getHours() < now.getHours()) ||
        (date.getFullYear() === now.getFullYear() &&
          date.getMonth() === now.getMonth() &&
          date.getDate() === now.getDate() &&
          date.getHours() === now.getHours() &&
          date.getMinutes() < now.getMinutes()))&&
        data.map((activity) => (
        
            <>
            aktywności przyszłe
              <li id='activity' value={`${!(date.getFullYear() < now.getFullYear() ||
        (date.getFullYear() === now.getFullYear() &&
          date.getMonth() < now.getMonth()) ||
        (date.getFullYear() === now.getFullYear() &&
          date.getMonth() === now.getMonth() &&
          date.getDate() < now.getDate()) ||
        (date.getFullYear() === now.getFullYear() &&
          date.getMonth() === now.getMonth() &&
          date.getDate() === now.getDate() &&
          date.getHours() < now.getHours()) ||
        (date.getFullYear() === now.getFullYear() &&
          date.getMonth() === now.getMonth() &&
          date.getDate() === now.getDate() &&
          date.getHours() === now.getHours() &&
          date.getMinutes() < now.getMinutes()))?1:0} `} key={activity._id}>
            
                data: {`${activity.Date} `}
                Nazwa: {`${activity.Name}, `}
                Czas: {`${activity.Time}, `}
                Koszt: {`${activity.ActivityCost}, `}
                Transport: {`${activity.Transport}, `}
                Kalorie: {`${activity.Calories}, `}
                Koszt Kalorii: {`${activity.CalorieCost}, `}
                status: {`${ifPlaned}, `}
              
                <button onClick={() => handleDelete(activity._id)}>Usuń</button>
              </li>
            </>
          ))} */}
      <button onClick={() => handleDeleteAll()}>Usuń wszystko</button>

      <button onClick={handleCreateActivity}>Stwórz aktywność</button>
    </div>
  );
};

export default UpdateDb;

// import React from "react";
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

// const handleDeleteTenis = async (tenisId) => {
//   try {
//     await deleteTenisMutation.mutateAsync(tenisId);
//     console.log("Tenis deleted successfully");
//   } catch (error) {
//     console.error("Error deleting tenis:", error);
//   }
// };

// // Przykład użycia w komponencie TenisItem

// const UpdateDb = () => {
//   const queryClient = useQueryClient();
//   const { data, isLoading, error } = useQuery({
//     queryKey: "tenisData",
//     queryFn: fetchData,
//   });

//   // Definicja deleteTenisMutation
//   const deleteTenisMutation = useMutation({
//     mutationFn: deleteTenis,
//     onSuccess: () => {
//       // Odświeżenie danych po usunięciu Tenis
//       queryClient.invalidateQueries('tenisData');
//     },
//   });

//   const handleDeleteClick = () => {
//     handleDeleteTenis(data);
//   };

//   const createTenisMutation = useMutation({
//     mutationFn: createTenis,
//     onSuccess: () => {
//       queryClient.invalidateQueries("tenisData");
//     },
//   });

//   const handleCreateActivity = async () => {
//     try {
//       await createTenisMutation.mutateAsync({
//         Name: "New Tenis",
//         country: "New Country",
//         age: 20,
//         rank: 1,
//       });
//     } catch (error) {
//       console.error("Error creating tenis:", error);
//     }
//   };

//   if (isLoading) return <div>Loading...</div>;
//   if (error) return <div>Error: {error.message}</div>;

//   return (
//     <div>

//       <h1>Tenis Data</h1>
//       <ul>
//         {data.map((tenis) => (
//           <li key={tenis._id}>
//             {tenis.Name} - {tenis.country} - {tenis.age} - {tenis.rank}
//           </li>
//         ))}
//       </ul>
//       <button onClick={handleCreateActivity}>Create Tenis</button>
//       <button onClick={handleDeleteClick}>Usuń</button>
//     </div>
//   );
// };

// export default UpdateDb;
