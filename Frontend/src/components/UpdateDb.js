import React, { useEffect, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import ActivityCard from "./ActivityCard";

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
  storedDataPast,
}) => {
  const [sortByCost, setSortByCost] = useState(false);
  useEffect(() => {}, [past, planned]);
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

  const handleDelete = async (id) => {
    try {
      await deleteTenisMutation.mutateAsync(id);
    } catch (error) {
      console.error("Error deleting tenis:", error);
    }
  };

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

  console.log(past, planned, "past/planned");

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
  console.log(new Date(date) < new Date(), "isAfter");
  // Dane do sortowania

  // Funkcja do sortowania danych po dacie

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const parseDateFromString = (dateString) => {
    console.log("parseDateFromString dostało:", dateString);

    if (!dateString) {
      console.log("!!! BRAK DATE !!!");
      return new Date(0);
    }

    const [time, date] = dateString.split(" ");

    if (!time || !date) {
      console.log("!!! ZŁY FORMAT DATY !!!", dateString);
      return new Date(0);
    }

    const [hour, minute] = time.split(":");
    const [day, month, year] = date.split("/");

    return new Date(year, month - 1, day, hour, minute);
  };

  const sortedData = data.sort((a, b) => {
    const dateA = parseDateFromString(a.Date);
    const dateB = parseDateFromString(b.Date);

    return dateA - dateB;
  });

  storedDataFuture = storedDataFuture
    .filter((a) => parseDateFromString(a.Date) > new Date())
    .filter((a) => {
      if (username == "admin") {
        return a;
      } else {
        return a.User == username;
      }
    });

  storedDataPast = storedDataPast
    .filter((a) => parseDateFromString(a.Date) < new Date())
    .filter((a) => {
      if (username == "admin") {
        return a;
      } else {
        return a.User == username;
      }
    });

  // Wyświetl posortowane dane
  let displayData;
  const userData = sortedData.filter((a) => {
    if (username == "admin") {
      return a;
    } else {
      return a.User == username;
    }
  });
  console.log(userData);

  if (sortByCost) {
    displayData = [...userData].sort((a, b) => a.CalorieCost - b.CalorieCost);
  } else {
    displayData = userData;
  }

  const today = new Date();

  return (
    <div className="data-from-db">
      <div className="activity-list">
        {/* <h2>Historia aktywności:</h2> */}
        <button onClick={() => setSortByCost(!sortByCost)}>
          {sortByCost ? "Przywróć kolejność" : "Sortuj według opłacalności"}
        </button>{" "}
      </div>

      <ul>
        {planned && <>przyszłe aktywności</>}

        {planned && (
          <div className="activity-list">
            {storedDataFuture.map((activity) => (
              <ActivityCard
                key={activity._id}
                activity={activity}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </ul>

      <ul>
        {past && <>przeszłe aktywności</>}
        {past && (
          <div className="activity-list">
            {storedDataPast.map((activity) => (
              <ActivityCard
                key={activity._id}
                activity={activity}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </ul>
      <ul>
        {all && (
          <div className="activity-list">
            {<>wszystkie aktywności</>}
            {displayData.map((activity) => (
              <ActivityCard
                key={activity._id}
                activity={activity}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </ul>

      <button onClick={() => handleDeleteAll()}>Usuń wszystko</button>

      <button onClick={handleCreateActivity}>Stwórz aktywność</button>
    </div>
  );
};

export default UpdateDb;
