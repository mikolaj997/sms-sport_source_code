import "../App.css";
import React, { Children, useEffect, useState } from "react";
import { SelectedSport } from "./SelectedSport";

import { useQuery, useMutation, useQueryClient, Mutation } from "@tanstack/react-query";
import { fetchData } from "./userApi";
import { createUser } from "./userApi";
import { updateUser } from "./userApi";



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

const deleteAllData = async () => {
    const response = await fetch(`/api/user`, {
      method: "DELETE",
    });
  };

function Profile({username, prefSport, setPrefSport, selectedSport, setSelectedSport, tenisOptionsExtended, setTenisOptionsExtended, runningOptionsExtended, setRunningOptionsExtended, cyclingOptionsExtended, setCyclingOptionsExtended }) {
    const [newData, setNewData] = useState({});
   
    
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
const updateUserMutation = useMutation({
    mutationFn: (username, user) => updateUser(username, user),
    onSuccess: () => {
      queryClient.invalidateQueries("userData");
    },
  });
//   let thisUser
//   useEffect(() => {
//       thisUser = data.find(user => user.Name === username);
       
//      }, []);
//   const handleUpdate = () => {
//     console.log(thisUser);
//     if (thisUser) {
//         const newData = {
//             ...thisUser,
//             selectedSport,
           
//           };
//       updateUserMutation.mutate({ id: thisUser._id, newData });
//     } else {
//       alert('User not found');
//     }
//   };

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
const deleteTenis = async (id) => {
    const response = await fetch(`/api/user/${id}`, {
      method: "DELETE",
    });
  };

const handleAddUser = async (username, sport) => {
     
    const user = { Name: username, Location: "Gdynia",
    Sport: sport}; // do dodsnia w przyszłości TransportType: selectedTransportType
    await createUserMutation.mutate(user);
    console.log(data.map(data=>data.Name));
  };
  const handleUpdateUser = async (username, sport) => {
    console.log(data.some(data => data.Name === username));
    if (data.some(data => data.Name === username)) { // Assuming data contains users and their names
      const user = {
        Location: "Gdynia",
        Sport: sport
      };
      try {
        await updateUserMutation.mutateAsync({ username, user });
      } catch (error) {
        console.error('Failed to update user:', error);
      }
    } else {
      console.error('User not found');
    }
  };
  
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
  const handleDelete = async (id) => {
    try {
      await deleteTenisMutation.mutateAsync(id);
    } catch (error) {
      console.error("Error deleting tenis:", error);
    }
  };
  const handleDeleteAll = async () => {
    try {
      const response = await fetch("/api/user", {
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

  useEffect(() => {
       setPrefSport(selectedSport)
    }, [selectedSport])
  

    return(<div className="profile">
     {username}

     {/* {data.map(data=>(
        <li key={data._id}>
            <button onClick={()=>handleDelete(data._id)}>x</button>
        </li>
        ))}  */}
      <p>
      ulubiona aktywność: <SelectedSport  selectedSport={selectedSport}
              setSelectedSport={setSelectedSport}
              tenisOptionsExtended={tenisOptionsExtended}
              setTenisOptionsExtended={setTenisOptionsExtended}
              runningOptionsExtended={runningOptionsExtended}
              setRunningOptionsExtended={setRunningOptionsExtended}
              cyclingOptionsExtended={cyclingOptionsExtended}
              setCyclingOptionsExtended={setCyclingOptionsExtended}></SelectedSport>
      </p>
      <p>preferowana lokalizacja: <select>
        <option>Gdynia</option>
        <option>Sopot</option>
        <option>Gdańsk</option>
        </select></p>
        <p>lokalizacja punktu startowego:</p>
        {/* <button onClick={()=>handleAddUser(username, selectedSport)}></button> */}
        <button onClick={()=>handleUpdateUser}>edytuj dane</button>
        <button onClick={()=>handleDeleteAll}>usuń dane</button>
        {/* <button onClick={handleUpdate}>Update User</button> */}
    </div>)
    
} export default Profile