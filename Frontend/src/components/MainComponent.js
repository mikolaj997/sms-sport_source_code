import "../App.css";
import React, { useEffect, useState } from "react";
// import mapboxgl from "mapbox-gl";
// import "mapbox-gl/dist/mapbox-gl.css";
import { handleCalculateCalories } from "./CalorieCalculator";
import { handleCalculateCost } from "./ProfitabilityCalculator";
import clubsAndOtherLocations from "./ClubsAndOtherLocations";
import Navbar from "./Navbar";
import { SelectedSport } from "./SelectedSport";
import ShortcutPopup from "./ShortcutPopup";
import axios from "axios";
import ServerConnection from "./ServerConnection";
import UpdateDb from "./UpdateDb";
// import NewActivity from "./NewActivity";
import UpdateDbFrontView from "./UpdateDbFrontView";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Profile from "./Profile";
import Chat from "./chat";
import MapComponent from "./Map";

function MainComponent({ username, setUsername, setPassword, setIsLoggedIn }) {
  const [startPoint, setStartPoint] = useState([18.5531, 54.4449]);
  const [active, setActive] = useState(false);
  const [travelTime, setTravelTime] = useState("");
  const [kindOfTransport, setKindOfTransport] = useState("");
  const [price, setPrice] = useState("");
  const [priceOfDrive, setPriceOfDrive] = useState("");
  const [selectedSport, setSelectedSport] = useState("");
  const [tenisOptionsExtended, setTenisOptionsExtended] = useState("");
  const [runningOptionsExtended, setRunningOptionsExtended] = useState("");
  const [cyclingOptionsExtended, setCyclingOptionsExtended] = useState("");
  const [activityTime, setActivityTime] = useState("");
  const [weightKg, setWeightKg] = useState("");
  const [totalCalories, setTotalCalories] = useState(0);
  const [totalCalorieCost, setTotalCalorieCost] = useState(0);
  const [fuelCost, setFuelCost] = useState("");
  const [fuelConsumption, setFuelConsumption] = useState("");
  //const [tripInstructions, setTripInstructions] = useState('');
  const [distanceInKm, setDistanceInKm] = useState(0);
  const [storedDistanceInKm, setStoredDistanceInKm] = useState(0); // do local storage
  const [storedDataFuture, setStoredDataFuture] = useState("");
  const [storedDataPast, setStoredDataPast] = useState("");

  const [isHistoryVisible, setIsHistoryVisible] = useState(false);
  const [isPastVisible, setIsPastVisible] = useState(false);
  const [isPlannedVisible, setIsPlannedVisible] = useState(false);
  const [isProfileVisible, setIsProfileVisible] = useState(false);
  const [isChatVisible, setIsChatVisible] = useState(false);
  const [click, setClick] = useState(false);
  const [date, setDate] = useState(new Date());
  const [prefSport, setPrefSport] = useState("");
  const [preferredLocation, setPreferredLocation] = useState("Gdynia");
  const [isVisible, setIsVisible] = useState(false);
  const [ifPlaned, setIfPlaned] = useState(false);
  const [planned, setPlanned] = useState(false);
  const [past, setPast] = useState(false);
  const [all, setAll] = useState(false);

  const handleClickOutside = (e) => {
    if (isVisible && !e.target.closest(".popup")) {
      setIsVisible(false);
    }
  };

  console.log(click, "click");
  const showHome = () => {
    setIsHistoryVisible(false);
    setIsPastVisible(false);
    setIsPlannedVisible(false);
    setIsProfileVisible(false);
    setIsChatVisible(false);

    setAll(false);
    setPast(false);
    setPlanned(false);

    document.getElementById("map").style.display = "block";
    document.getElementById("instructions").style.display = "block";
    document.querySelector(".select-container").style.display = "block";
    document.querySelector(".activityData").style.display = "flex";
    document.querySelector(".rightTopButtons").style.display = "block";
  };
  const toggleHistory = () => {
    setIsHistoryVisible(!isHistoryVisible);
    setAll(true);
    if (!isHistoryVisible) {
      document.getElementById("map").style.display = "none";
      document.getElementById("instructions").style.display = "none";
    } else {
      document.getElementById("map").style.display = "block";
      document.getElementById("instructions").style.display = "block";
    }
  };
  const togglePast = () => {
    setIsPastVisible(!isPastVisible);
    setPast(!past);
    if (!isPastVisible) {
      document.getElementById("map").style.display = "none";
      document.getElementById("instructions").style.display = "none";
    } else {
      document.getElementById("map").style.display = "block";
      document.getElementById("instructions").style.display = "block";
    }
  };
  const togglePlanned = () => {
    setIsPlannedVisible(!isPlannedVisible);
    setPlanned(!planned);
    console.log(isPlannedVisible, isPastVisible);
    if (!isPlannedVisible) {
      document.getElementById("map").style.display = "none";
      document.getElementById("instructions").style.display = "none";
    } else {
      document.getElementById("map").style.display = "block";
      document.getElementById("instructions").style.display = "block";
    }
  };
  const toggleProfile = () => {
    const newValue = !isProfileVisible;

    setIsProfileVisible(newValue);
    setIsHistoryVisible(false);
    setIsPastVisible(false);
    setIsPlannedVisible(false);
    setIsChatVisible(false);

    if (newValue) {
      document.getElementById("map").style.display = "none";
      document.getElementById("instructions").style.display = "none";
      document.querySelector(".select-container").style.display = "none";
      document.querySelector(".activityData").style.display = "none";
      document.querySelector(".rightTopButtons").style.display = "none";
    } else {
      document.getElementById("map").style.display = "block";
      document.getElementById("instructions").style.display = "block";
      document.querySelector(".select-container").style.display = "block";
      document.querySelector(".activityData").style.display = "block";
      document.querySelector(".rightTopButtons").style.display = "block";
    }
  };

  const toggleChat = () => {
    const newValue = !isChatVisible;

    setIsChatVisible(newValue);
    setIsHistoryVisible(false);
    setIsPastVisible(false);
    setIsPlannedVisible(false);
    setIsProfileVisible(false);

    if (newValue) {
      document.querySelector(".select-container").style.display = "none";
      document.querySelector(".activityData").style.display = "none";
      document.querySelector(".rightTopButtons").style.display = "none";
    } else {
      document.getElementById("map").style.display = "block";
      document.getElementById("instructions").style.display = "block";
      document.querySelector(".select-container").style.display = "block";
      document.querySelector(".activityData").style.display = "flex";
      document.querySelector(".rightTopButtons").style.display = "block";
    }
  };

  const handleTransportChange = (e) => {
    setKindOfTransport(e.target.value);
    console.log("spalone kalorie:", totalCalories);
  };

  const updateTravelTime = (duration) => {
    setTravelTime(duration);
  };
  const updateDistance = (distance) => {
    setDistanceInKm(distance);
  };

  console.log("total:", totalCalories);
  // const [startPoint, setStartPoint] = useState([longitude, latitude]);
  // Funkcja do zmiany lokalizacji punktu startowego
  const handleChangeStartPoint = () => {
    console.log(active);
    setActive(!active);
    console.log(active);
    // Tutaj możesz dodać kod do zmiany lokalizacji punktu startowego na mapie
    // Na przykład możesz użyć biblioteki mapowej, takiej jak Mapbox GL JS
    // Aktualizacja stanu startPoint // Nowa lokalizacja punktu startowego
  };

  // const handleCalculateCost = () => { //do poprawy!!!
  // };
  console.log(distanceInKm);

  localStorage.setItem("distanceInKm", distanceInKm);

  // Funkcja do odczytywania danych z localStorage przy ładowaniu komponentu
  useEffect(() => {
    const storedDistance = localStorage.getItem("distanceInKm");

    if (storedDistance) {
      setStoredDistanceInKm(parseFloat(storedDistance));
    }
  }, []);
  console.log(storedDistanceInKm);
  // const handleCalculateCalories = () => {
  // };
  function onClickAction(e) {
    if (e.key === "o") {
      handleCalculateCost(distanceInKm, setTotalCalorieCost);
      console.log("koszt");
    }
    if (e.key === "k") {
      handleCalculateCalories(setTotalCalories);
      console.log("kalorie");
    }
    if (e.key === "s") {
      console.log("zmien punkt startowy");
    }

    if (e.key === "a") {
      toggleHistory();
      console.log("historia"); //do poprawy
    }
    if (e.key === "d") {
      setClick(!click);

      console.log("dodaja aktywnosc"); //do poprawy
    }
  }

  // Inicjalizacja mapy i dodanie granic mapy
  
  return (
    <>
      <div style={{ height: "fit-content", width: "100%" }}>
        <Navbar
          setUsername={setUsername}
          setIsLoggedIn={setIsLoggedIn}
          setPlanned={setPlanned}
          setPast={setPast}
          toggleHistory={toggleHistory}
          isHistoryVisible={isHistoryVisible}
          togglePlanned={togglePlanned}
          isPlannedVisible={isPlannedVisible}
          showHome={showHome}
          togglePast={togglePast}
          isPastVisible={isPastVisible}
          toggleProfile={toggleProfile}
          setPassword={setPassword}
          toggleChat={toggleChat}
        ></Navbar>
      </div>

      <div onClick={handleClickOutside} style={{ display: "flex" }}>
        <div style={{ flex: 1, position: "relative" }}>
          <div className="rightTopButtons">
            <ShortcutPopup></ShortcutPopup>
            <button
              className={`${
                active == true ? "active" : "changeLocalizationBtn"
              }`}
              onClick={handleChangeStartPoint}
            >
              Zmień lokalizację punktu startowego
            </button>
          </div>
          {isChatVisible && (
            <div
              style={{
                width: "100%",
                height: "100%",
                position: "absolute",
                top: 0,
                left: 0,
                backgroundColor: "whitesmoke",
              }}
            >
              <Chat
                username={username}
                prefSport={prefSport}
                selectedSport={selectedSport}
                setSelectedSport={setSelectedSport}
                tenisOptionsExtended={tenisOptionsExtended}
                setTenisOptionsExtended={setTenisOptionsExtended}
                runningOptionsExtended={runningOptionsExtended}
                setRunningOptionsExtended={setRunningOptionsExtended}
                cyclingOptionsExtended={cyclingOptionsExtended}
                setCyclingOptionsExtended={setCyclingOptionsExtended}
              ></Chat>
              {/* <UpdateDb 
            selectedSport={selectedSport}
            activityTime={activityTime}
            totalCalories={totalCalories}
            totalCalorieCost={totalCalorieCost}
            travelTime={travelTime}
            price={price}
            storedDistanceInKm={storedDistanceInKm}
            kindOfTransport={kindOfTransport}
            click={click}
            date={date}
            ifPlaned={ifPlaned}
            planned={planned}
            
          ></UpdateDb> */}
            </div>
          )}
          {isProfileVisible && (
            <div
              style={{
                width: "100%",
                height: "100%",
                position: "absolute",
                top: 0,
                left: 0,
                backgroundColor: "whitesmoke",
              }}
            >
              <Profile
                username={username}
                prefSport={prefSport}
                setPrefSport={setPrefSport}
                selectedSport={selectedSport}
                setSelectedSport={setSelectedSport}
                kindOfTransport={kindOfTransport}
                setKindOfTransport={setKindOfTransport}
                preferredLocation={preferredLocation}
                setPreferredLocation={setPreferredLocation}
                startPoint={startPoint}
                setStartPoint={setStartPoint}
                tenisOptionsExtended={tenisOptionsExtended}
                setTenisOptionsExtended={setTenisOptionsExtended}
                runningOptionsExtended={runningOptionsExtended}
                setRunningOptionsExtended={setRunningOptionsExtended}
                cyclingOptionsExtended={cyclingOptionsExtended}
                setCyclingOptionsExtended={setCyclingOptionsExtended}
              >
                {/* <SelectedSport
              selectedSport={selectedSport}
              setSelectedSport={setSelectedSport}
              tenisOptionsExtended={tenisOptionsExtended}
              setTenisOptionsExtended={setTenisOptionsExtended}
              runningOptionsExtended={runningOptionsExtended}
              setRunningOptionsExtended={setRunningOptionsExtended}
              cyclingOptionsExtended={cyclingOptionsExtended}
              setCyclingOptionsExtended={setCyclingOptionsExtended}
            ></SelectedSport> */}
              </Profile>
              {/* <UpdateDb 
            selectedSport={selectedSport}
            activityTime={activityTime}
            totalCalories={totalCalories}
            totalCalorieCost={totalCalorieCost}
            travelTime={travelTime}
            price={price}
            storedDistanceInKm={storedDistanceInKm}
            kindOfTransport={kindOfTransport}
            click={click}
            date={date}
            ifPlaned={ifPlaned}
            planned={planned}
            
          ></UpdateDb> */}
            </div>
          )}

          {/* {data && <pre>{JSON.stringify(data, null, 2)}</pre>} */}
          <div onKeyUp={onClickAction} className="select-container">
            {/* <ServerConnection selectedSport={selectedSport} ></ServerConnection> */}
            <SelectedSport
              selectedSport={selectedSport}
              setSelectedSport={setSelectedSport}
              tenisOptionsExtended={tenisOptionsExtended}
              setTenisOptionsExtended={setTenisOptionsExtended}
              runningOptionsExtended={runningOptionsExtended}
              setRunningOptionsExtended={setRunningOptionsExtended}
              cyclingOptionsExtended={cyclingOptionsExtended}
              setCyclingOptionsExtended={setCyclingOptionsExtended}
            ></SelectedSport>
            <select
              id="locationSelect"
              value={preferredLocation}
              onChange={(e) => setPreferredLocation(e.target.value)}
            >
              <option value="">Wybierz lokalizację</option>
              <option value="Gdynia">Gdynia</option>
              <option value="Gdańsk">Gdańsk</option>
              <option value="Sopot">Sopot</option>
            </select>
            <select
              id="travelKindSelect"
              value={kindOfTransport}
              onChange={(e) => setKindOfTransport(e.target.value)}
            >
              <option value="">Wybierz środek transportu</option>
              <option value="driving">samochód</option>
              <option value="cycling">rower</option>
              <option value="walking">pieszo</option>
            </select>
            <input
              type="number"
              id="weightInput"
              placeholder="waga (kg)"
              value={weightKg}
              onChange={(e) => setWeightKg(parseFloat(e.target.value))}
            />
            <input
              type="number"
              id="travelTimeInput"
              placeholder="czas podrózy (min)"
              value={travelTime}
              onChange={(e) => setTravelTime(parseFloat(e.target.value))}
            />
            <input
              type="number"
              id="activityTimeInput"
              placeholder="czas aktywności (min)"
              value={activityTime}
              onChange={(e) => setActivityTime(parseFloat(e.target.value))}
            />
            <input
              type="number"
              id="priceInput"
              placeholder="koszt aktywności"
              value={price}
              onChange={(e) => setPrice(parseFloat(e.target.value))}
            />
            {/* popraw */}

            {kindOfTransport === "driving" && (
              <>
                <input
                  type="number"
                  id="fuelCost"
                  placeholder="cena litra paliwa"
                  value={fuelCost}
                  onChange={(e) => {
                    setFuelCost(parseFloat(e.target.value));
                  }}
                />
                <input
                  type="number"
                  id="fuelConsumption"
                  placeholder="złuzycie paliwa na 100km"
                  value={fuelConsumption}
                  onChange={(e) =>
                    setFuelConsumption(parseFloat(e.target.value))
                  }
                />
                <input
                  type="number"
                  id="priceOfDriveInput"
                  placeholder="koszt dojazdu"
                  disabled={fuelCost !== "" && fuelConsumption !== ""}
                  value={priceOfDrive}
                  onChange={(e) => setPriceOfDrive(parseFloat(e.target.value))}
                />
              </>
            )}
            {kindOfTransport !== "driving" && (
              <input
                type="number"
                id="priceOfDriveInput"
                placeholder="koszt dojazdu"
                disabled={false}
                value={priceOfDrive}
                onChange={(e) => setPriceOfDrive(parseFloat(e.target.value))}
              />
            )}
            {/* <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} /> */}
            <label>data rozpoczęcia:</label>
            <DatePicker
              type="number"
              selected={date}
              onChange={(date) => {
                setDate(date);
              }}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={15}
              dateFormat="d.MM.yyyy h:mm"
              timeCaption="Time"
            />
            <div className="buttons">
              {/* <button id="calculateButton" class='button' onClick={() => handleCalculateCost(distanceInKm)}>Oblicz opłacalność</button> */}
              <button
                id="calculateButton"
                class="button"
                onClick={() =>
                  handleCalculateCost(distanceInKm, setTotalCalorieCost)
                }
              >
                Oblicz opłacalność
              </button>
              {/* <HandleCalculateCalories ></HandleCalculateCalories> //totalCalories={totalCalories} setTotalCalories={setTotalCalories} */}
              <button
                id="calculateCaloriesButton"
                class="button"
                onClick={() => handleCalculateCalories(setTotalCalories)}
              >
                Oblicz kalorie
              </button>
            </div>
          </div>
          {/* <NewActivity selectedSport={selectedSport}
                  activityTime={activityTime}
                  totalCalories={totalCalories}
                  totalCalorieCost={totalCalorieCost}
                  travelTime={travelTime}
                  price={price}
                  storedDistanceInKm={storedDistanceInKm}
                  kindOfTransport={kindOfTransport}
                  toggleHistory={toggleHistory}
                  isVisible={isVisible}
                  click={click}
                  setClick={setClick}></NewActivity> */}
          {/* {isHistoryVisible && ( //do poprawy
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  position: "absolute",
                  top: 0,
                  left: 0,
                  backgroundColor: "rgba(0, 0, 0, 0.5)",
                }}
              >
                Historia aktywności:
                <UpdateDb
                  selectedSport={selectedSport}
                  activityTime={activityTime}
                  totalCalories={totalCalories}
                  totalCalorieCost={totalCalorieCost}
                  travelTime={travelTime}
                  price={price}
                  storedDistanceInKm={storedDistanceInKm}
                  kindOfTransport={kindOfTransport}
                ></UpdateDb>
              </div>)} */}

          {/* <button onClick={""}>historia</button> onClick={filesystemData} */}

          <UpdateDbFrontView
            className="UpdateDbFrontView"
            selectedSport={selectedSport}
            activityTime={activityTime}
            totalCalories={totalCalories}
            totalCalorieCost={totalCalorieCost}
            travelTime={travelTime}
            price={price}
            storedDistanceInKm={distanceInKm}
            kindOfTransport={kindOfTransport}
            priceOfDrive={priceOfDrive}
            click={click}
            setClick={setClick}
            date={date}
            ifPlaned={ifPlaned}
            setIfPlaned={setIfPlaned}
            planned={planned}
            username={username}
            setStoredDataFuture={setStoredDataFuture}
            setStoredDataPast={setStoredDataPast}
          ></UpdateDbFrontView>

          {/* do bazy danych   onClick={saveFilesystemData}*/}
        </div>
        <div style={{ flex: 1, height: "90vh", position: "relative" }}>
          <MapComponent
  selectedSport={selectedSport}
  kindOfTransport={kindOfTransport}
  startPoint={startPoint}
  setStartPoint={setStartPoint}
  active={active}
  setActive={setActive}
  updateDistance={updateDistance}
  updateTravelTime={updateTravelTime}
/>
          <div id="instructions" style={{ position: "absolute", top: "0" }}>
            Dane Dojazdu:
          </div>
          {isHistoryVisible && (
            <div
              style={{
                width: "100%",
                height: "100%",
                position: "absolute",
                top: 0,
                left: 0,
                backgroundColor: "whitesmoke",
              }}
            >
              Historia aktywności:
              <UpdateDb
                selectedSport={selectedSport}
                activityTime={activityTime}
                totalCalories={totalCalories}
                totalCalorieCost={totalCalorieCost}
                travelTime={travelTime}
                price={price}
                storedDistanceInKm={storedDistanceInKm}
                kindOfTransport={kindOfTransport}
                click={click}
                date={date}
                ifPlaned={ifPlaned}
                all={all}
                username={username}
                storedDataFuture={storedDataFuture}
                storedDataPast={storedDataPast}
              ></UpdateDb>
              {/* zrób to! */}
            </div>
          )}

          {/* zrób na podstawie isHistoryVisible */}
          {isPlannedVisible && (
            <div
              style={{
                display: "block",
                width: "100%",
                height: "100%",
                position: "absolute",
                top: 0,
                left: 0,
                backgroundColor: "whitesmoke",
              }}
            >
              <UpdateDb
                selectedSport={selectedSport}
                activityTime={activityTime}
                totalCalories={totalCalories}
                totalCalorieCost={totalCalorieCost}
                travelTime={travelTime}
                price={price}
                storedDistanceInKm={storedDistanceInKm}
                kindOfTransport={kindOfTransport}
                click={click}
                date={date}
                ifPlaned={ifPlaned}
                planned={planned}
                storedDataFuture={storedDataFuture}
                storedDataPast={storedDataPast}
                username={username}
              ></UpdateDb>
            </div>
          )}
          {isPastVisible && (
            <div
              style={{
                width: "100%",
                height: "100%",
                position: "absolute",
                top: 0,
                left: 0,
                backgroundColor: "whitesmoke",
              }}
            >
              <UpdateDb
                selectedSport={selectedSport}
                activityTime={activityTime}
                totalCalories={totalCalories}
                totalCalorieCost={totalCalorieCost}
                F
                travelTime={travelTime}
                price={price}
                storedDistanceInKm={storedDistanceInKm}
                kindOfTransport={kindOfTransport}
                click={click}
                date={date}
                ifPlaned={ifPlaned}
                past={past}
                storedDataFuture={storedDataFuture}
                storedDataPast={storedDataPast}
                username={username}
              ></UpdateDb>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default MainComponent;
