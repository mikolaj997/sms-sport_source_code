import React, { useEffect, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";


const fetchData = async (username) => {
  const response = await fetch(
    `http://localhost:3001/api/activity?user=${username}`,
  );

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  return response.json();
};

const createActivity = async (newActivity) => {
  const response = await fetch("/api/activity", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newActivity),
  });
  if (!response.ok) {
    throw new Error("Failed to create activity");
  }
  return response.json();
};
const deleteActivity = async (id) => {
  const response = await fetch(`/api/activity/${id}`, {
    method: "DELETE",
  });
};

const UpdateDbFrontView = ({
  selectedSport,
  activityTime,
  totalCalories,
  totalCalorieCost,
  travelTime,
  price,
  storedDistanceInKm,
  kindOfTransport,
  priceOfDrive,
  click,
  setClick,
  date,
  ifPlaned,
  setIfPlaned,
  username,
  setStoredDataFuture,
  setStoredDataPast,
}) => {
  const queryClient = useQueryClient();
  
  const { data, isLoading, error } = useQuery({
    queryKey: ["activityData", username],
    queryFn: () => fetchData(username),
  });
  
  useEffect(() => {
    if (data) {
      setStoredDataFuture(data);
      setStoredDataPast(data);
    }
  }, [data, setStoredDataFuture, setStoredDataPast]);
  const createActivityMutation = useMutation({
    mutationFn: createActivity,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["activityData", username],
      });
    },
  });

  const deleteActivityMutation = useMutation({
    mutationFn: deleteActivity,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["activityData", username],
      });
    },
  });
  const handleCreateActivity = async () => {
    const polishMonths = [
      "stycznia",
      "lutego",
      "marca",
      "kwietnia",
      "maja",
      "czerwca",
      "lipca",
      "sierpnia",
      "września",
      "października",
      "listopada",
      "grudnia",
    ];

    const hour = date.getHours();
    const minutes = date.getMinutes();
    const days = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    const monthPolish = month[polishMonths];

    const formattedDate = `${hour}:${minutes} ${days}/${month}/${year}`;

    try {
      await createActivityMutation.mutateAsync({
        Date: `${formattedDate}`,
        Name: `${selectedSport}`,
        Time: activityTime,
        ActivityCost: price + priceOfDrive,
        Transport: kindOfTransport,
        Calories: totalCalories,
        CalorieCost: totalCalorieCost,
        User: username,

        // IsPlaned: ifPlaned //dokończ
      });
      console.log(username);
    } catch (error) {
      console.error("Error creating activity:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteActivityMutation.mutateAsync(id);
    } catch (error) {
      console.error("Error deleting tenis:", error);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
   

      <div className="activityData">
        <span>
          Aktywność:{" "}
          {selectedSport === "Paddleball, competitive"
            ? "Padel"
            : selectedSport === "Tennis, general"
              ? "tenis ziemny"
              : selectedSport === "Table tennis, ping pong"
                ? "tenis stołowy"
                : selectedSport === "Running, general"
                  ? "bieganie"
                  : selectedSport}
        </span>
        <span>Czas: {activityTime} minut</span>
        <span>Cena: {price} złotych</span>
        <span>Dystans: {storedDistanceInKm} kilometrów</span>
        <span>
          Rodzaj transportu:{" "}
          {kindOfTransport == "driving" ? "samochód" : kindOfTransport}
        </span>
        <span>Kalorie: {totalCalories.toFixed(2)}</span>
        <span>Koszt Kalorii: {totalCalorieCost.toFixed(2)} złotych</span>
        <button onClick={handleCreateActivity} className="addBtn">
          dodaj
        </button>
       
      </div>
    </div>
  );
};

export default UpdateDbFrontView;
