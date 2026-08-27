import "../App.css";
import React, { useEffect, useState } from "react";
import { handleCalculateCalories } from "./CalorieCalculator";
import { handleCalculateCost } from "./ProfitabilityCalculator";
import clubsAndOtherLocations from "./ClubsAndOtherLocations";
import Navbar from "./Navbar";
import { SelectedSport } from "./SelectedSport";
import ShortcutPopup from "./ShortcutPopup";
import axios from "axios";
import UpdateDb from "./UpdateDb";
import UpdateDbFrontView from "./UpdateDbFrontView";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Profile from "./Profile";
import Chat from "./chat";
import MapComponent from "./Map";
import Calendar from "./Calendar";
import translations from "./translations";

function MainComponent({
  username,
  setUsername,
  setPassword,
  setIsLoggedIn,
  language,
  setLanguage,
}) {
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
  const [isCalendarVisible, setIsCalendarVisible] = useState(false);

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
    setIsCalendarVisible(false);

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
      // document.getElementById("map").style.display = "none";
      document.getElementById("instructions").style.display = "block";
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
  const toggleCalendar = () => {
    const newValue = !isCalendarVisible;

    setIsCalendarVisible(newValue);

    setIsHistoryVisible(false);
    setIsPastVisible(false);
    setIsPlannedVisible(false);
    setIsProfileVisible(false);
    setIsChatVisible(false);

    setAll(false);
    setPast(false);
    setPlanned(false);

    if (newValue) {
      document.getElementById("map").style.display = "none";
      document.getElementById("instructions").style.display = "none";
    } else {
      document.getElementById("map").style.display = "block";
      document.getElementById("instructions").style.display = "block";
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
  // Funkcja do zmiany lokalizacji punktu startowego
  const handleChangeStartPoint = () => {
    console.log("USTAWIAM ACTIVE");
    console.log("przed:", active);

    setActive(!active);
  };
  useEffect(() => {
    console.log("ACTIVE ZMIENIONE:", active);
  }, [active]);

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
          toggleCalendar={toggleCalendar}
          isCalendarVisible={isCalendarVisible}
          language={language}
          setLanguage={setLanguage}
        ></Navbar>
      </div>

      <div onClick={handleClickOutside} style={{ display: "flex" }}>
        <div style={{ flex: 1, position: "relative" }}>
          <div className="rightTopButtons">
            <ShortcutPopup language={language}></ShortcutPopup>
            {!isHistoryVisible &&
              !isPastVisible &&
              !isPlannedVisible &&
              !isCalendarVisible && (
                <button
                  className={`${
                    active == true ? "active" : "changeLocalizationBtn"
                  }`}
                  onClick={handleChangeStartPoint}
                >
                  {translations[language].changeStartingPoint}
                </button>
              )}
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
                language={language}
              ></Chat>
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
                overflowY: "auto",
                zIndex: 10,
              }}
            >
              <div
                style={{
                  width: "50%",
                  height: "100%",
                  overflowY: "auto",
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
                  active={active}
                  setActive={setActive}
                  tenisOptionsExtended={tenisOptionsExtended}
                  setTenisOptionsExtended={setTenisOptionsExtended}
                  runningOptionsExtended={runningOptionsExtended}
                  setRunningOptionsExtended={setRunningOptionsExtended}
                  cyclingOptionsExtended={cyclingOptionsExtended}
                  setCyclingOptionsExtended={setCyclingOptionsExtended}
                  language={language}
                ></Profile>
              </div>
            </div>
          )}

          <div onKeyUp={onClickAction} className="select-container">
            <SelectedSport
              selectedSport={selectedSport}
              setSelectedSport={setSelectedSport}
              tenisOptionsExtended={tenisOptionsExtended}
              setTenisOptionsExtended={setTenisOptionsExtended}
              runningOptionsExtended={runningOptionsExtended}
              setRunningOptionsExtended={setRunningOptionsExtended}
              cyclingOptionsExtended={cyclingOptionsExtended}
              setCyclingOptionsExtended={setCyclingOptionsExtended}
              language={language}
            ></SelectedSport>
            <select
              id="locationSelect"
              value={preferredLocation}
              onChange={(e) => setPreferredLocation(e.target.value)}
            >
              <option value="">{translations[language].chooseLocation}</option>
              <option value="Gdynia">Gdynia</option>
              <option value="Gdańsk">Gdańsk</option>
              <option value="Sopot">Sopot</option>
            </select>
            <select
              id="travelKindSelect"
              value={kindOfTransport}
              onChange={(e) => setKindOfTransport(e.target.value)}
            >
              <option value="">
                {
                  /* Wybierz środek transportu  */ translations[language]
                    .chooseTransport
                }
              </option>
              <option value="driving">{translations[language].car}</option>
              <option value="cycling">{translations[language].bike}</option>
              <option value="walking">{translations[language].walking}</option>
            </select>
            <input
              type="number"
              id="weightInput"
              placeholder={translations[language].weightPlaceholder}
              value={weightKg}
              onChange={(e) => setWeightKg(parseFloat(e.target.value))}
            />
            <input
              type="number"
              id="travelTimeInput"
              placeholder={translations[language].travelTimePlaceholder}
              value={travelTime}
              onChange={(e) => setTravelTime(parseFloat(e.target.value))}
            />
            <input
              type="number"
              id="activityTimeInput"
              placeholder={translations[language].activityTimePlaceholder}
              value={activityTime}
              onChange={(e) => setActivityTime(parseFloat(e.target.value))}
            />
            <input
              type="number"
              id="priceInput"
              placeholder={translations[language].activityCostPlaceholder}
              value={price}
              onChange={(e) => setPrice(parseFloat(e.target.value))}
            />
            {/* popraw */}
            {kindOfTransport === "driving" && (
              <>
                <input
                  type="number"
                  id="fuelCost"
                  placeholder={translations[language].fuelCostPlaceholder}
                  value={fuelCost}
                  onChange={(e) => {
                    setFuelCost(parseFloat(e.target.value));
                  }}
                />
                <input
                  type="number"
                  id="fuelConsumption"
                  placeholder={
                    translations[language].fuelConsumptionPlaceholder
                  }
                  value={fuelConsumption}
                  onChange={(e) =>
                    setFuelConsumption(parseFloat(e.target.value))
                  }
                />
                <input
                  type="number"
                  id="priceOfDriveInput"
                  placeholder={translations[language].travelCostPlaceholder}
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
                placeholder={translations[language].travelCostPlaceholder}
                disabled={false}
                value={priceOfDrive}
                onChange={(e) => setPriceOfDrive(parseFloat(e.target.value))}
              />
            )}
            <label>{translations[language].startDate}</label>{" "}
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
              <button
                id="calculateButton"
                className="button"
                onClick={() =>
                  handleCalculateCost(distanceInKm, setTotalCalorieCost)
                }
              >
                {translations[language].calculateProfitability}
              </button>

              <button
                id="calculateCaloriesButton"
                className="button"
                onClick={() => handleCalculateCalories(setTotalCalories)}
              >
                {translations[language].calculateCalories}
              </button>
            </div>
          </div>

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
            language={language}
          ></UpdateDbFrontView>
        </div>
        <div style={{ flex: 1, height: "90vh", position: "relative" }}>
          {isCalendarVisible && (
            <div
              style={{
                width: "100%",
                height: "100%",
                position: "absolute",
                top: 0,
                left: 0,
                backgroundColor: "whitesmoke",
                zIndex: 10,
              }}
            >
              <Calendar
                storedDataFuture={storedDataFuture}
                storedDataPast={storedDataPast}
                username={username}
                language={language}
              />
            </div>
          )}
          <MapComponent
            selectedSport={selectedSport}
            kindOfTransport={kindOfTransport}
            startPoint={startPoint}
            setStartPoint={setStartPoint}
            active={active}
            setActive={setActive}
            updateDistance={updateDistance}
            updateTravelTime={updateTravelTime}
            language={language}
          />
          <div
            id="instructions"
            style={{ position: "absolute", top: "0", zIndex: 10 }}
          >
            {translations[language].travelData}
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
              {translations[language].activityHistory}
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
                language={language}
              ></UpdateDb>
              {/* zrób to! */}
            </div>
          )}

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
                language={language}
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
