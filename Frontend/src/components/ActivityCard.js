const ActivityCard = ({ activity, onDelete }) => (
  <div className="activity-card">
    <div className="activity-main">
      <strong>{activity.Name === "Paddleball, competitive"
        ? "Padel"
        : activity.Name === "Tennis, general"
          ? "tenis ziemny"
          : activity.Name === "Table tennis, ping pong"
            ? "tenis stołowy"
            : activity.Name === "Running, general"
              ? "bieganie"
              : activity.Name}</strong>
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

      <button onClick={() => onDelete(activity._id)}>
        Usuń
      </button>
    </div>
  </div>
);

export default ActivityCard;