// import React from 'react';
// import { useData } from './DataContext';

// const CaloriesComponent = () => {
//   const { caloriesData } = useData();

//   return (
//     <div>
//       <h2>Kalorie spalane podczas różnych dyscyplin:</h2>
//       <ul>
//         <li>Tenis: {caloriesData.tennis} kalorii</li>
//         <li>Squash: {caloriesData.squash} kalorii</li>
//         <li>Bieganie: {caloriesData.running} kalorii</li>
//         {/* inne dyscypliny... */}
//       </ul>
//     </div>
//   );
// };

// export default CaloriesComponent;
import CalorieBurnData from "./CalorieBurnData";
import { useEffect } from "react";
import { useState } from "react";

export function handleCalculateCalories(caloriesBurned) {
  const weight = 81; //added

  const sportSelect = document.getElementById("sportSelect");
  const locationSelect = document.getElementById("locationSelect");
  const weightInput = document.getElementById("weightInput");
  const activityTime = document.getElementById("activityTimeInput").value;
  let selectedSportExtendedOpts;

  let selectedSport = sportSelect.value;
  const weightKg = parseFloat(weightInput.value);

  if (!selectedSport || isNaN(weight)) {
    alert("Proszę wybrać aktywność i podać wagę.");
    return;
  }

  if (
    selectedSport === "Tennis, general" ||
    selectedSport === "Cycling, 12-13.9mph, moderate" ||
    selectedSport === "Running, general"
  ) {
    if (selectedSport === "Tennis, general") {
      selectedSportExtendedOpts = document.getElementById(
        "tennisExtendedOptions"
      ).value;
    } else if (selectedSport === "Cycling, 12-13.9mph, moderate") {
      selectedSportExtendedOpts = document.getElementById(
        "cyclingExtendedOptions"
      ).value;
    } else if (selectedSport === "Running, general") {
      selectedSportExtendedOpts = document.getElementById(
        "runningExtendedOptions"
      ).value;
    }

    console.log(selectedSportExtendedOpts);

    const selectedActivityCalories = CalorieBurnData[selectedSportExtendedOpts];
    const caloriesPerHour = selectedActivityCalories[2];
    let totalCalories =
      (caloriesPerHour * weightKg * (activityTime / 60)) / weight;
    caloriesBurned(totalCalories);

    alert(
      `Spalone kalorie podczas ${activityTime / 60} godzin${
        activityTime / 60 == 1 ? "y" : ""
      } ${
        selectedSportExtendedOpts.includes("Tennis")
          ? `gry w ${selectedSportExtendedOpts.split(" ")[0].slice(0, -1)}a ${
              selectedSportExtendedOpts.split(" ")[1] == "singles"
                ? "(singiel)"
                : selectedSportExtendedOpts.split(" ")[1] == "doubles"
                ? "(debel)"
                : ""
            }`
          : selectedSportExtendedOpts.includes("Running")
          ? `${
              selectedSportExtendedOpts.split(" ")[0].slice(0, -1) == "Running"
                ? "biegania"
                : ""
            }(${
              selectedSportExtendedOpts
                .slice(selectedSportExtendedOpts.split(" ")[1])
                .trim() == "8 mph (7.5 min/mile)"
                ? "12,9 km/h"
                : !selectedSportExtendedOpts.includes("general")
                ? "16,1 km/h"
                : "średnim tempem"
            })`
          : selectedSportExtendedOpts.includes("Cycling")
          ? `jazdy na ${
              selectedSportExtendedOpts.split(" ")[0].slice(0, -1) == "Cycling"
                ? "rowerze"
                : ""
            }(${
              selectedSportExtendedOpts
                .slice(selectedSportExtendedOpts.split(" ")[1])
                .trim() == "12-13.9mph, moderate"
                ? "rowerze, 19.3-22.4km/h"
                : selectedSportExtendedOpts
                    .slice(selectedSportExtendedOpts.split(" ")[1])
                    .trim() == "Cycling, 10-11.9mph, light"
                ? "rowerze, 16.1-19.2km/h"
                : "rowerze, 22.5-25.6km/h"
            })`
          : selectedSportExtendedOpts
      } dla osoby ważącej ${weightKg} kg: ${totalCalories.toFixed(2)}`
    );
  } else {
    const selectedActivityCalories = CalorieBurnData[selectedSport];
    const caloriesPerHour = selectedActivityCalories[2];
    let totalCalories =
      (caloriesPerHour * weightKg * (activityTime / 60)) / weight;
      caloriesBurned(totalCalories);
      
    alert(
      `Spalone kalorie podczas ${activityTime / 60} godzin${
        activityTime / 60 == 1 ? "y" : ""
      } ${
        selectedSport === "Squash"
          ? `gry w ${selectedSport}a`
          : selectedSport === "Table tennis, ping pong"
          ? `gry w tenisa stolowego`
          : selectedSport === "Paddleball, competitive"
          ? `gry w ${selectedSport.split(" ")[0].slice(0, -8)}la`
          : selectedSport === "Badminton"
          ? `gry w ${selectedSport}a`
          : selectedSport === "Running, general"
          ? `${
              selectedSport.split(" ")[0].slice(0, -1) == "Running"
                ? "biegania"
                : ""
            }`
          : selectedSport === "Cycling, 12-13.9mph, moderate"
          ? `jazdy na ${
              selectedSport.split(" ")[0].slice(0, -1) == "Cycling"
                ? "rowerze"
                : ""
            }`
          : selectedSport
      } dla osoby ważącej ${weightKg} kg: ${totalCalories.toFixed(2)} `
    );

    caloriesBurned(totalCalories);
  }
}
