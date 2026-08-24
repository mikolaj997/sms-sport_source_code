import React, { useState } from "react";

const Calendar = ({ storedDataFuture, storedDataPast, username }) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const activities = [...(storedDataPast || []), ...(storedDataFuture || [])]
    .filter((activity) => {
      if (username === "admin") {
        return true;
      }

      return activity.User === username;
    })
    .filter(
      (activity, index, array) =>
        index === array.findIndex((a) => a._id === activity._id),
    );

  const parseDateFromString = (dateString) => {
    if (!dateString) return null;

    const [time, date] = dateString.split(" ");

    if (!time || !date) return null;

    const [hour, minute] = time.split(":");
    const [day, month, year] = date.split("/");

    return new Date(year, month - 1, day, hour, minute);
  };

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDay = new Date(year, month, 1);
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // Poniedziałek = 0, niedziela = 6
  const startDay = (firstDay.getDay() + 6) % 7;

  const days = [];

  for (let i = 0; i < startDay; i++) {
    days.push(null);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    days.push(day);
  }

  const previousMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const monthName = currentDate.toLocaleString("pl-PL", {
    month: "long",
    year: "numeric",
  });

  return (
    <div className="calendar">
      <div className="calendar-header">
        <button onClick={previousMonth}>←</button>

        <h2>{monthName}</h2>

        <button onClick={nextMonth}>→</button>
      </div>

      <div className="calendar-weekdays">
        <div>Pon</div>
        <div>Wt</div>
        <div>Śr</div>
        <div>Czw</div>
        <div>Pt</div>
        <div>Sob</div>
        <div>Nd</div>
      </div>

      <div className="calendar-grid">
        {days.map((day, index) => {
          const dayActivities =
            day !== null
              ? activities.filter((activity) => {
                  const activityDate = parseDateFromString(activity.Date);

                  if (!activityDate) return false;

                  return (
                    activityDate.getDate() === day &&
                    activityDate.getMonth() === currentDate.getMonth() &&
                    activityDate.getFullYear() === currentDate.getFullYear()
                  );
                })
              : [];

          return (
            <div
              key={index}
              className={`calendar-day ${day === null ? "empty" : ""}`}
            >
              <div>{day}</div>

              {dayActivities.map((activity) => (
                <div key={activity._id} className="calendar-activity">
                  {activity.Name}
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;
