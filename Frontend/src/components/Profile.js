import "../App.css";
import React, { Children, useEffect, useState } from "react";
import { SelectedSport } from "./SelectedSport";
import translations from "./translations";

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

  active,
  setActive,

  tenisOptionsExtended,
  setTenisOptionsExtended,

  runningOptionsExtended,
  setRunningOptionsExtended,

  cyclingOptionsExtended,
  setCyclingOptionsExtended,

  language,
}) {
  const [newData, setNewData] = useState({});

  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ["userData"],
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
      <h3>{translations[language].profileTitle}</h3>

      <p>
        <strong>{translations[language].user}:</strong> {username}
      </p>

      <hr />

      <h4>{translations[language].preferences}</h4>

      <div style={{ marginBottom: "15px" }}>
        <label>{translations[language].favoriteActivity}:</label>
        <SelectedSport
          selectedSport={selectedSport}
          setSelectedSport={setSelectedSport}
          tenisOptionsExtended={tenisOptionsExtended}
          setTenisOptionsExtended={setTenisOptionsExtended}
          runningOptionsExtended={runningOptionsExtended}
          setRunningOptionsExtended={setRunningOptionsExtended}
          cyclingOptionsExtended={cyclingOptionsExtended}
          setCyclingOptionsExtended={setCyclingOptionsExtended}
          language={language}
        />
      </div>

      <div style={{ marginBottom: "15px" }}>
        <label>{translations[language].defaultTransport}:</label>
        <select
          value={kindOfTransport}
          onChange={(e) => setKindOfTransport(e.target.value)}
        >
          <option value="walking">🚶 {translations[language].walking}</option>
          <option value="cycling">🚴 {translations[language].bike}</option>
          <option value="driving">🚗 {translations[language].car}</option>
        </select>
      </div>

      <div style={{ marginBottom: "15px" }}>
        <label>{translations[language].preferredLocation}:</label>
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
        <label>{translations[language].defaultStartingPoint}:</label>

        <div>
          <input type="text" value={startPoint[0].toFixed(5)} readOnly />
          <input type="text" value={startPoint[1].toFixed(5)} readOnly />
        </div>

        <button onClick={() => setActive(true)}>
          {translations[language].selectPointOnMap}
        </button>
      </div>

      <hr />

      <button onClick={handleUpdateUser}>
        {translations[language].savePreferences}
      </button>

      <button style={{ marginLeft: "10px" }} onClick={handleDeleteAll}>
        {translations[language].deleteData}
      </button>
    </div>
  );
}
export default Profile;
