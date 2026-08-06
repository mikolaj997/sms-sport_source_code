import "../App.css";
import React, { Children, useEffect, useState } from "react";
import { SelectedSport } from "./SelectedSport";

import {
  useQuery,
  useMutation,
  useQueryClient,
  Mutation,
} from "@tanstack/react-query";
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

function Profile({
  username,
  prefSport,
  setPrefSport,

  selectedSport,
  setSelectedSport,

  kindOfTransport,
  setKindOfTransport,

  preferredLocation,
  setPreferredLocation,

  startPoint,
  setStartPoint,

  tenisOptionsExtended,
  setTenisOptionsExtended,

  runningOptionsExtended,
  setRunningOptionsExtended,

  cyclingOptionsExtended,
  setCyclingOptionsExtended,
}) {
  const [newData, setNewData] = useState({});

  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: "userData",
    queryFn: fetchData,
  });

 const createUserMutation = useMutation({
  mutationFn: createUser,
  onSuccess: () => {
    queryClient.invalidateQueries({
      queryKey: ["userData"],
    });
  },
});

  const updateUserMutation = useMutation({
  mutationFn: updateUser,
  onSuccess: () => {
    queryClient.invalidateQueries({
      queryKey: ["userData"],
    });
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
    const user = { Name: username, Location: "Gdynia", Sport: sport }; // do dodsnia w przyszłości TransportType: selectedTransportType
    await createUserMutation.mutate(user);
    console.log(data.map((data) => data.Name));
  };
  const handleUpdateUser = async () => {
    console.log(data.some((data) => data.Name === username));

    if (data.some((data) => data.Name === username)) {
      const user = {
        Location: preferredLocation,
        Sport: selectedSport,
        Transport: kindOfTransport,
        StartPoint: startPoint,
      };

      try {
        await updateUserMutation.mutateAsync({
          username,
          user,
        });
      } catch (error) {
        console.error("Failed to update user:", error);
      }
    } else {
      console.error("User not found");
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
    setPrefSport(selectedSport);
  }, [selectedSport]);

  useEffect(() => {
    if (!data) return;

    const user = data.find((u) => u.Name === username);

    console.log("Username:", username);
    console.log("Users:", data);
    console.log("Found user:", user);

    if (!user) return;

    setSelectedSport(user.Sport || "");
    setKindOfTransport(user.Transport || "");
    setPreferredLocation(user.Location || "Gdynia");
    setStartPoint(user.StartPoint || [18.5531, 54.4449]);
  }, [data, username]);
  return (
    <div className="profile">
      <h3>👤 Profil</h3>

      <p>
        <strong>Użytkownik:</strong> {username}
      </p>

      <hr />

      <h4>Preferencje</h4>

      <div style={{ marginBottom: "15px" }}>
        <label>Ulubiona aktywność:</label>
        <SelectedSport
          selectedSport={selectedSport}
          setSelectedSport={setSelectedSport}
          tenisOptionsExtended={tenisOptionsExtended}
          setTenisOptionsExtended={setTenisOptionsExtended}
          runningOptionsExtended={runningOptionsExtended}
          setRunningOptionsExtended={setRunningOptionsExtended}
          cyclingOptionsExtended={cyclingOptionsExtended}
          setCyclingOptionsExtended={setCyclingOptionsExtended}
        />
      </div>

      <div style={{ marginBottom: "15px" }}>
        <label>Domyślny środek transportu:</label>
        <select
          value={kindOfTransport}
          onChange={(e) => setKindOfTransport(e.target.value)}
        >
          <option value="walking">🚶 Pieszo</option>
          <option value="cycling">🚴 Rower</option>
          <option value="driving">🚗 Samochód</option>
        </select>
      </div>

      <div style={{ marginBottom: "15px" }}>
        <label>Preferowana lokalizacja:</label>
        <select
          value={preferredLocation}
          onChange={(e) => setPreferredLocation(e.target.value)}
        >
          <option value="Gdynia">Gdynia</option>
          <option value="Sopot">Sopot</option>
          <option value="Gdańsk">Gdańsk</option>
        </select>
      </div>

      <div style={{ marginBottom: "15px" }}>
        <label>Domyślny punkt startowy:</label>

        <div>
          <input type="text" value={startPoint[0]} readOnly />

          <input type="text" value={startPoint[1]} readOnly />
        </div>

        <button>Wybierz punkt na mapie</button>
      </div>

      <hr />

      <button onClick={handleUpdateUser}>💾 Zapisz preferencje</button>

      <button style={{ marginLeft: "10px" }} onClick={handleDeleteAll}>
        🗑 Usuń dane
      </button>
    </div>
    // <div className="profile">
    //  {username}

    //  {/* {data.map(data=>(
    //     <li key={data._id}>
    //         <button onClick={()=>handleDelete(data._id)}>x</button>
    //     </li>
    //     ))}  */}
    //   <p>
    //   ulubiona aktywność: <SelectedSport  selectedSport={selectedSport}
    //           setSelectedSport={setSelectedSport}
    //           tenisOptionsExtended={tenisOptionsExtended}
    //           setTenisOptionsExtended={setTenisOptionsExtended}
    //           runningOptionsExtended={runningOptionsExtended}
    //           setRunningOptionsExtended={setRunningOptionsExtended}
    //           cyclingOptionsExtended={cyclingOptionsExtended}
    //           setCyclingOptionsExtended={setCyclingOptionsExtended}></SelectedSport>
    //   </p>
    //   <p>preferowana lokalizacja: <select>
    //     <option>Gdynia</option>
    //     <option>Sopot</option>
    //     <option>Gdańsk</option>
    //     </select></p>
    //     <p>lokalizacja punktu startowego:</p>
    //     {/* <button onClick={()=>handleAddUser(username, selectedSport)}></button> */}
    //     <button onClick={()=>handleUpdateUser}>edytuj dane</button>
    //     <button onClick={()=>handleDeleteAll}>usuń dane</button>
    //     {/* <button onClick={handleUpdate}>Update User</button> */}
    // </div>
  );
}
export default Profile;
