import React, { useEffect, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import translations from "./translations";

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
  language,
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
    if (
    !selectedSport ||
    activityTime == null ||
    price == null ||
    !kindOfTransport ||
    totalCalories == null ||
    totalCalorieCost == null ||
    !username
  ) {
    alert(translations[language].allFieldsRequired);
    return;
  }
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
    <div className="activityData">
      <span>
        {translations[language].activity}:{" "}
        {selectedSport === "Paddleball, competitive"
          ? translations[language].padel
          : selectedSport === "Tennis, general"
            ? translations[language].tennis
            : selectedSport === "Table tennis, ping pong"
              ? translations[language].tableTennis
              : selectedSport === "Running, general"
                ? translations[language].running
                : selectedSport}
      </span>

      <span>
        {translations[language].time}: {activityTime}{" "}
        {translations[language].minutes}
      </span>

      <span>
        {translations[language].price}: {price} {translations[language].zloty}
      </span>

      <span>
        {translations[language].distance}: {storedDistanceInKm}{" "}
        {translations[language].kilometers}
      </span>

      <span>
        {translations[language].transportType}:{" "}
        {kindOfTransport === "driving"
          ? translations[language].car
          : kindOfTransport === "cycling"
            ? translations[language].bike
            : kindOfTransport === "walking"
              ? translations[language].walking
              : kindOfTransport}
      </span>

      <span>
        {translations[language].calories}: {totalCalories.toFixed(2)}
      </span>

      <span>
        {translations[language].calorieCost}: {totalCalorieCost.toFixed(2)}{" "}
        {translations[language].zloty}
      </span>

      <button onClick={handleCreateActivity} className="addBtn">
        {translations[language].add}
      </button>
    </div>
  );
};

export default UpdateDbFrontView;
