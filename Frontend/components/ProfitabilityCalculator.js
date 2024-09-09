import CalorieBurnData from "./CalorieBurnData";
import YourComponent from "./MainComponent";

export function handleCalculateCost(distance, totalCalorieCost) {
  //do poprawy!!!

  try {
    const weight = 81; //added

    const sportSelect = document.getElementById("sportSelect");
    const locationSelect = document.getElementById("locationSelect");
    const weightInput = document.getElementById("weightInput");
    const travelTimeInput = document.getElementById("travelTimeInput");
    const activityTimeInput = document.getElementById("activityTimeInput");
    const priceInput = document.getElementById("priceInput");
    const kindOfTransport = document.getElementById("travelKindSelect");

    let priceOfDrive = 0;
    let selectedSportExtendedOpts;

    console.log(kindOfTransport.value);
    let selectedSport = sportSelect.value;
    const weightKg = parseFloat(weightInput.value);
    const activityTime = parseFloat(activityTimeInput.value);
    const price = parseFloat(priceInput.value);
    let totalCost = 0;

    console.log(travelTimeInput);
    console.log(distance);
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
      // if (selectedTransport === "samochod") {
      //     const fuelPrice = 5; // Przykładowa cena paliwa za litr
      //     const fuelConsumption = 8; // Przykładowe zużycie paliwa na 100 km
      //     const distance = travelTime; // Załóżmy, że czas podróży w godzinach odpowiada dystansowi w km

      const selectedActivityCalories =
        CalorieBurnData[selectedSportExtendedOpts];
      const caloriesPerHour = selectedActivityCalories[2];
      const caloriesPerValidTime = (caloriesPerHour/60) * activityTime

      if (kindOfTransport.value === "driving") {
        const fuelCostValue = document.getElementById("fuelCost").value;
        const fuelConsumptionValue =
          document.getElementById("fuelConsumption").value;

        console.log(distance, +fuelConsumptionValue.value, +fuelCostValue);
        priceOfDrive =
          (Number(fuelConsumptionValue) / 100) *
          Number(distance) *
          Number(fuelCostValue);
        console.log(
          typeof Number(distance),
          typeof +fuelConsumptionValue,
          typeof +fuelCostValue
        );
        console.log(priceOfDrive);
        totalCost =
          (price + +travelTimeInput.value + priceOfDrive) / caloriesPerValidTime;
          totalCalorieCost(totalCost);

      } else {
        totalCost = (price + +travelTimeInput.value) / caloriesPerValidTime;
        totalCalorieCost(totalCost);
      }
      alert(
        `${
          travelTimeInput
            ? `Koszt na jedną spaloną kalorię: ${totalCost} zł/kcal`
            : "Koszt na jedną spaloną kalorię nie jest dostępny, ponieważ czas dojazdu nie został wprowadzony przez użytkownika."
        } podczas ${ activityTime} minut ${
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
                selectedSportExtendedOpts.split(" ")[0].slice(0, -1) ==
                "Running"
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
                selectedSportExtendedOpts.split(" ")[0].slice(0, -1) ==
                "Cycling"
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
        }  i ${+travelTimeInput.value}min dojazdu`
      );
      //(${selectedSportExtendedOpts.split(' ')[1] == 'singles' ? 'singiel' : 'debel'})
    } else {
      const selectedActivityCalories = CalorieBurnData[selectedSport];
      const caloriesPerHour = selectedActivityCalories[2];
      const caloriesPerValidTime = (caloriesPerHour/60) * activityTime


      if (kindOfTransport.value === "driving") {
        const fuelCostValue = document.getElementById("fuelCost").value;
        const fuelConsumptionValue =
          document.getElementById("fuelConsumption").value;

        console.log(distance, +fuelConsumptionValue.value, +fuelCostValue);
        priceOfDrive =
          (Number(fuelConsumptionValue) / 100) *
          Number(distance) *
          Number(fuelCostValue);
        console.log(
          typeof Number(distance),
          typeof +fuelConsumptionValue,
          typeof +fuelCostValue
        );
        console.log(priceOfDrive);
        totalCost =
          (price + +travelTimeInput.value + priceOfDrive) / caloriesPerValidTime;
        console.log(totalCost);
        totalCalorieCost(totalCost);
      } else {
        totalCost = (price + +travelTimeInput.value) / caloriesPerValidTime;
        totalCalorieCost(totalCost);
      }

      alert(
        `${
          travelTimeInput
            ? `Koszt na jedną spaloną kalorię: ${totalCost} zł/kcal`
            : "Koszt na jedną spaloną kalorię nie jest dostępny, ponieważ czas dojazdu nie został wprowadzony przez użytkownika."
        } podczas ${ activityTime} minut ${
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
              } `
            : selectedSport
        } i ${+travelTimeInput.value}min dojazdu`
      );
    }
  } catch (error) {
    alert(error);
  }
}

/*
const handleCalculateCost = () => { //do poprawy!!!

  //     Tenis:

  // Kalorie na godzinę: 150
  // Opłata za kort: $75
  // Czas podróży: 10 minut(samochodem)
  // Koszt podróży: $10
  // Koszt całkowity dla tenisa:

  // Koszt całkowity
  //       =
  //       150
  //       +
  //       75
  //       +
  //       10
  // =
  //   235
  // Koszt całkowity = 150 + 75 + 10=235
  // Koszt na jedną kalorię:

  // Koszt na jedną kalorię
  //     =
  //     235
  //   150
  // ≈
  // 1.57
  // Koszt na jedną kalorię =
  //   150
  // 235
  // 
  // ≈1.57
  const sportSelect = document.getElementById("sportSelect");
  const locationSelect = document.getElementById("locationSelect");
  const weightInput = document.getElementById("weightInput");
  const travelTimeInput = document.getElementById("travelTimeInput");
  const activityTimeInput = document.getElementById("activityTimeInput");
  const priceInput = document.getElementById("priceInput");

  const selectedSport = sportSelect.value;
  const weightKg = parseFloat(weightInput.value);

  const activityTime = parseFloat(activityTimeInput.value);
  const price = parseFloat(priceInput.value);

  const selectedActivityCalories = CalorieBurnData[selectedSport];
  const caloriesPerHour = selectedActivityCalories[2];

  const totalCost = (price + +travelTimeInput.value) / caloriesPerHour
  console.log(CalorieBurnData[selectedSport]);

  // // Oblicz łączny czas podróży (w godzinach)
  // const totalTravelTime = activityTime + travelTime; //dokończ
  // console.log(totalTravelTime);

  // let totalTravelCost = 0
  // let totalCalorieCost = 0
  // const travelCost = 10

  // totalTravelCost = totalTravelTime * travelCost;
  // console.log(totalTravelCost);
  // // Oblicz łączny koszt kalorii na podstawie preferencji użytkownika
  // totalCalorieCost = (CalorieBurnData[selectedSport] * activityTime) + price + totalTravelCost;

  // // Oblicz łączny koszt podróży

  // // Oblicz koszt na kalorię
  // const costPerCalorie = totalCalorieCost / (CalorieBurnData[selectedSport] * activityTime);
  // console.log(typeof costPerCalorie, typeof totalCalorieCost, typeof totalTravelCost, typeof totalTravelTime, typeof travelTime, typeof weightKg);
  alert(`Spalone kalorie podczas ${travelTime} minut ${selectedSport} dla osoby ważącej ${weight} kg: ${'totalCalorieCost.toFixed(2)'}\n${travelTime ? `Koszt na jedną spaloną kalorię: ${totalCost} zł/kcal` : "Koszt na jedną spaloną kalorię nie jest dostępny, ponieważ czas dojazdu nie został wprowadzony przez użytkownika."}`);
  // Zwróć koszt na kalorię
  // return costPerCalorie.toFixed(2); // Zaokrąglamy do dwóch miejsc po przecinku

  //   const sportSelect = document.getElementById("sportSelect");
  //   const weightInput = document.getElementById("weightInput");
  //   let travelTimeInput = document.getElementById("travelTimeInput");

  //   const selectedSport = sportSelect.value;
  //   const weight = parseFloat(weightInput.value);
  //   let travelTime = parseFloat(travelTimeInput.value);

  //   if (!selectedSport || isNaN(weight)) {
  //     alert("Proszę wybrać aktywność i podać wagę.");
  //     return;
  //   }

  //   // Użyj domyślnego czasu z Mapboxa, jeśli użytkownik nie podał czasu
  //   // if (isNaN(travelTime)) {
  //   //   travelTime = defaultTravelTimeFromMapbox; // Ustaw domyślny czas z Mapboxa
  //   // } else {
  //   //   setUserProvidedTime(true); // Ustaw flagę, że czas został wprowadzony przez użytkownika
  //   // }

  //   const selectedActivityCalories = CalorieBurnData[selectedSport];
  //   const caloriesPerHour = selectedActivityCalories[2];
  //   let totalCalories = (caloriesPerHour * weight * travelTime) / +weightKg;

  //   // Jeśli wybrano samochód, dodaj koszt dojazdu
  //   const transportSelect = document.getElementById("transportSelect");
  //   const selectedTransport = transportSelect.value;
  //   if (selectedTransport === "samochod") {
  //     const fuelPrice = 5; // Przykładowa cena paliwa za litr
  //     const fuelConsumption = 8; // Przykładowe zużycie paliwa na 100 km
  //     const distance = travelTime; // Załóżmy, że czas podróży w godzinach odpowiada dystansowi w km
  //     const costOfTravel = (distance * fuelConsumption * fuelPrice) / 100; // Koszt podróży w złotych
  //     totalCalories += costOfTravel;
  //   }

  //   // Oblicz koszt na jedną spaloną kalorię, jeśli czas został wprowadzony przez użytkownika
  //   let costPerCalorie = null;
  //   if (userProvidedTime) {
  //     costPerCalorie = totalCalories / (caloriesPerHour * weight * travelTime);
  //   }

  //   alert(`Spalone kalorie podczas ${travelTime} minut ${selectedSport} dla osoby ważącej ${weight} kg: ${totalCalories.toFixed(2)}\n${userProvidedTime ? `Koszt na jedną spaloną kalorię: ${costPerCalorie.toFixed(2)} zł/kcal` : "Koszt na jedną spaloną kalorię nie jest dostępny, ponieważ czas dojazdu nie został wprowadzony przez użytkownika."}`);

*/
