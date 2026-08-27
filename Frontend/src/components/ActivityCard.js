import React, { useState } from "react";
import translations from "./translations";

const ActivityCard = ({
  activity,
  onDelete,
  username,
  onUpdate,
  language,
}) => {
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

      onUpdate(updatedActivity);

      setIsEditing(false);
    } catch (error) {
      console.error("Błąd podczas edycji aktywności:", error);
    }
  };

  return (
    <div className="activity-card">
      {isEditing ? (
        <div>
          <div>
            <label>{translations[language].activity}</label>
            <input
              value={editedActivity.Name}
              onChange={(e) => handleChange("Name", e.target.value)}
            />
          </div>

          <div>
            <label>{translations[language].date}</label>
            <input
              value={editedActivity.Date}
              onChange={(e) => handleChange("Date", e.target.value)}
            />
          </div>

          <div>
            <label>{translations[language].time}</label>
            <input
              type="number"
              value={editedActivity.Time}
              onChange={(e) => handleChange("Time", e.target.value)}
            />
          </div>

          <div>
            <label>{translations[language].cost}</label>
            <input
              type="number"
              value={editedActivity.ActivityCost}
              onChange={(e) =>
                handleChange("ActivityCost", e.target.value)
              }
            />
          </div>

          <div>
            <label>{translations[language].transport}</label>
            <input
              value={editedActivity.Transport}
              onChange={(e) =>
                handleChange("Transport", e.target.value)
              }
            />
          </div>

          <button onClick={() => setIsEditing(false)}>
            {translations[language].cancel}
          </button>

          <button onClick={handleSave}>
            {translations[language].save}
          </button>
        </div>
      ) : (
        <>
          <div className="activity-main">
            <strong>
              {activity.Name === "Paddleball, competitive"
                ? translations[language].padel
                : activity.Name === "Tennis, general"
                  ? translations[language].tennis
                  : activity.Name === "Table tennis, ping pong"
                    ? translations[language].tableTennis
                    : activity.Name === "Running, general"
                      ? translations[language].running
                      : activity.Name}
            </strong>

            <span>{activity.Date}</span>
          </div>

          <div className="activity-details">
            <div>
              <span>{translations[language].time}</span>
              <strong>{activity.Time ?? "-"} min</strong>
            </div>

            <div>
              <span>{translations[language].cost}</span>
              <strong>{activity.ActivityCost ?? "-"} zł</strong>
            </div>

            <div>
              <span>{translations[language].calories}</span>
              <strong>
                {activity.Calories != null
                  ? Number(activity.Calories).toFixed(3)
                  : "0.000"}{" "}
                kcal
              </strong>
            </div>

            <div>
              <span>{translations[language].calorieCost}</span>
              <strong>
                {activity.CalorieCost != null
                  ? Number(activity.CalorieCost).toFixed(3)
                  : "0.000"}{" "}
                zł
              </strong>
            </div>

            <div>
              <span>{translations[language].transport}</span>
              <strong>
                {activity.Transport === "cycling"
                  ? translations[language].bike
                  : activity.Transport === "driving"
                    ? translations[language].car
                    : translations[language].walking}
              </strong>
            </div>

            <div className="activity-buttons">
              <button onClick={() => setIsEditing(true)}>
                {translations[language].edit}
              </button>

              <button onClick={() => onDelete(activity._id)}>
                {translations[language].delete}
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ActivityCard;