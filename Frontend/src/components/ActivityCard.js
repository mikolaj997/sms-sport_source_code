import React, { useState } from "react";

const ActivityCard = ({ activity, onDelete, username, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);

  const [editedActivity, setEditedActivity] = useState({
    Name: activity.Name,
    Date: activity.Date,
    Time: activity.Time ?? "",
    ActivityCost: activity.ActivityCost ?? "",
    Transport: activity.Transport ?? "",
  });

  const handleChange = (field, value) => {
    setEditedActivity((prev) => ({
      ...prev,
      [field]: value,
    }));
  };
  const handleSave = async () => {
  try {
    const response = await fetch(
      `http://localhost:3001/api/activity/${activity._id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...activity,
          Name: editedActivity.Name,
          Date: editedActivity.Date,
          Time: Number(editedActivity.Time),
          ActivityCost: Number(editedActivity.ActivityCost),
          Transport: editedActivity.Transport,
        }),
      }
    );

    if (!response.ok) {
  throw new Error("Nie udało się zaktualizować aktywności");
}

const updatedActivity = await response.json();

setIsEditing(false);
onUpdate(updatedActivity);
} catch (error) {
  console.error("Błąd podczas edycji aktywności:", error);
}
};

  return (
    <div className="activity-card">
      {isEditing ? (
        <div>
          <div>
            <label>Aktywność</label>
            <input
              value={editedActivity.Name}
              onChange={(e) => handleChange("Name", e.target.value)}
            />
          </div>

          <div>
            <label>Data</label>
            <input
              value={editedActivity.Date}
              onChange={(e) => handleChange("Date", e.target.value)}
            />
          </div>

          <div>
            <label>Czas</label>
            <input
              type="number"
              value={editedActivity.Time}
              onChange={(e) => handleChange("Time", e.target.value)}
            />
          </div>

          <div>
            <label>Koszt</label>
            <input
              type="number"
              value={editedActivity.ActivityCost}
              onChange={(e) => handleChange("ActivityCost", e.target.value)}
            />
          </div>

          <div>
            <label>Transport</label>
            <input
              value={editedActivity.Transport}
              onChange={(e) => handleChange("Transport", e.target.value)}
            />
          </div>

          <button onClick={() => setIsEditing(false)}>Anuluj</button>

<button onClick={handleSave}>Zapisz</button>   
     </div>
      ) : (
        <>
          <div className="activity-main">
            <strong>
              {activity.Name === "Paddleball, competitive"
                ? "Padel"
                : activity.Name === "Tennis, general"
                  ? "tenis ziemny"
                  : activity.Name === "Table tennis, ping pong"
                    ? "tenis stołowy"
                    : activity.Name === "Running, general"
                      ? "bieganie"
                      : activity.Name}
            </strong>

            <span>{activity.Date}</span>
          </div>

          <div className="activity-details">
            <div>
              <span>Czas</span>
              <strong>{activity.Time ?? "-"} min</strong>
            </div>

            <div>
              <span>Koszt</span>
              <strong>{activity.ActivityCost ?? "-"} zł</strong>
            </div>

            <div>
              <span>Kalorie</span>
              <strong>
                {activity.Calories != null
                  ? Number(activity.Calories).toFixed(3)
                  : "0.000"}{" "}
                kcal
              </strong>
            </div>

            <div>
              <span>Koszt kalorii</span>
              <strong>
                {activity.CalorieCost != null
                  ? Number(activity.CalorieCost).toFixed(3)
                  : "0.000"}{" "}
                zł
              </strong>
            </div>

            <div>
              <span>Transport</span>
              <strong>
                {activity.Transport === "cycling"
                  ? "rower"
                  : activity.Transport === "driving"
                    ? "samochód"
                    : "pieszo"}
              </strong>
            </div>
<div className="activity-buttons">
            <button onClick={() => setIsEditing(true)}>Edytuj</button>

            <button onClick={() => onDelete(activity._id)}>Usuń</button>
</div>
          </div>
        </>
      )}
    </div>
  );
};

export default ActivityCard;
