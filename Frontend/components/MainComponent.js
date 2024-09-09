import "../App.css";
import React, { useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
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
    setIsProfileVisible(!isProfileVisible);
    // setPlanned(true)

    if (!isProfileVisible) {
      document.getElementById("map").style.display = "none";
      document.getElementById("instructions").style.display = "none";
      document.querySelector(".select-container").style.display = "none";
      document.querySelector(".activityData").style.display = "none";
      document.querySelector(".rightTopButtons").style.display = "none";
    } else {
      document.getElementById("map").style.display = "block";
      document.getElementById("instructions").style.display = "block";
      document.getElementById("instructions").style.display = "block";
      document.querySelector(".select-container").style.display = "block";
      // document.querySelector(".UpdateDbFrontView").style.display = "none";
      document.querySelector(".rightTopButtons").style.display = "block";
      document.querySelector(".profile").style.display = "none";
    }
  };
  const toggleChat = () => {
    setIsChatVisible(!isChatVisible);

    if (!isChatVisible) {
      // document.getElementById("map").style.display = "none";
      // document.getElementById("instructions").style.display = "none";
      document.querySelector(".select-container").style.display = "none";
      document.querySelector(".activityData").style.display = "none";
      document.querySelector(".rightTopButtons").style.display = "none";
    } else {
      document.getElementById("map").style.display = "block";
      document.getElementById("instructions").style.display = "block";
      document.querySelector(".select-container").style.display = "block";
      document.querySelector(".activityData").style.display = "flex";
      document.querySelector(".rightTopButtons").style.display = "block";
      // document.querySelector(".profile").style.display = "none";
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
  useEffect(() => {
    mapboxgl.accessToken =
      "Token"; // {do_usuniecia} - to abym widział efekty na zywo bez marnowania requestów api
      let map
      const getMap =() =>{
   map = new mapboxgl.Map({
    container: "map",
    style: "mapbox://styles/mapbox/streets-v12",
    center: [18.4293, 54.4293],
    zoom: 1,
  });

}
getMap()
    // Ustaw granice mapy na obszar obejmujący Trójmiasto
    // const clubs = [
    // ];
    // const nonInstitutionActivities = [
    // ]
    const bounds = [
      [18.2893, 54.2593], // sw/se Południowo-zachodni narożnik
      [18.6693, 54.6493], // Północno-wschodni narożnik
    ];
    map.setMaxBounds(bounds);
    // Dodaj markery do mapy
    clubsAndOtherLocations[0].clubs.forEach(function (club) {
      // new mapboxgl.Marker() -- działajacy blok
      //   .setLngLat(club.coordinates)
      //   .setPopup(new mapboxgl.Popup().setHTML(`<h3>${club.name}</h3>`)) // Dodaj popup, który wyświetla nazwę klubu
      //   .addTo(map);
      if (club.type === "badminton" && selectedSport === "Badminton") {
        var el = document.createElement("div");
        el.className = "marker " + club.type;

        new mapboxgl.Marker(el)
          .setLngLat(club.coordinates)
          .setPopup(new mapboxgl.Popup().setHTML(`<h3>${club.name}</h3>`))
          .addTo(map);
      } else if (club.type === "tennis" && selectedSport.includes("Tennis")) {
        var el = document.createElement("div");
        el.className = "marker " + club.type;

        new mapboxgl.Marker(el)
          .setLngLat(club.coordinates)
          .setPopup(new mapboxgl.Popup().setHTML(`<h3>${club.name}</h3>`))
          .addTo(map);
      } else if (
        club.type === "tennis_stolowy" &&
        selectedSport.includes("Table")
      ) {
        var el = document.createElement("div");
        el.className = "marker " + club.type;

        new mapboxgl.Marker(el)
          .setLngLat(club.coordinates)
          .setPopup(new mapboxgl.Popup().setHTML(`<h3>${club.name}</h3>`))
          .addTo(map);
      } else if (
        club.type === "padel" &&
        selectedSport.includes("Paddleball")
      ) {
        var el = document.createElement("div");
        el.className = "marker " + club.type;

        new mapboxgl.Marker(el)
          .setLngLat(club.coordinates)
          .setPopup(new mapboxgl.Popup().setHTML(`<h3>${club.name}</h3>`))
          .addTo(map);
      } else if (!selectedSport) {
        var el = document.createElement("div");
        el.className = "marker " + club.type;

        new mapboxgl.Marker(el)
          .setLngLat(club.coordinates)
          .setPopup(new mapboxgl.Popup().setHTML(`<h3>${club.name}</h3>`))
          .addTo(map);
      }
      // create a HTML element for each feature
    });
    clubsAndOtherLocations[1].nonInstitutionActivities.forEach(function (
      place
    ) {
      if (
        place.type === "running/walking" &&
        selectedSport.includes("Running")
      ) {
        var el = document.createElement("div");
        el.className = "marker " + place.type;

        new mapboxgl.Marker(el)
          .setLngLat(place.coordinates)
          .setPopup(new mapboxgl.Popup().setHTML(`<h3>${place.name}</h3>`))
          .addTo(map);
      }
    });

    // create a function to make a directions request
    async function getRoute(end, kindOfTransport) {
      //popraw!!!
      // const kindOfTransport = await kindOfTransport1
      // make a directions request using cycling profile
      console.log(kindOfTransport === "cycling" ? "cycling1" : "");
      // kindOfTransport ${kindOfTransport} ${kindOfTransport === 'cycling'?'cycling':kindOfTransport==='driving'?'driving':kindOfTransport==='walking'?'walking':''}
      let query = "";
      if (kindOfTransport === "driving") {
        const query1 = await fetch(
          `https://api.mapbox.com/directions/v5/mapbox/driving/${startPoint[0]},${startPoint[1]};${end[0]},${end[1]}?steps=true&geometries=geojson&access_token=${mapboxgl.accessToken}`,
          { method: "GET" }
        );
        query = query1;
      } else if (kindOfTransport === "cycling") {
        const query1 = await fetch(
          `https://api.mapbox.com/directions/v5/mapbox/cycling/${startPoint[0]},${startPoint[1]};${end[0]},${end[1]}?steps=true&geometries=geojson&access_token=${mapboxgl.accessToken}`,
          { method: "GET" }
        );
        query = query1;
      } else {
        const query1 = await fetch(
          `https://api.mapbox.com/directions/v5/mapbox/walking/${startPoint[0]},${startPoint[1]};${end[0]},${end[1]}?steps=true&geometries=geojson&access_token=${mapboxgl.accessToken}`,
          { method: "GET" }
        );
        query = query1;
      }

      const json = await query.json();
      const data = json.routes[0];
      console.log(data);
      const route = await data.geometry.coordinates;
      const geojson = {
        type: "Feature",
        properties: {},
        geometry: {
          type: "LineString",
          coordinates: route,
        },
      };
      let distanceKm
      if (map.getSource("route")) {
        map.getSource("route").setData(geojson);
        const instructions = document.getElementById("instructions");
         distanceKm = (data.distance / 1000).toFixed(2);
        updateDistance(distanceKm);
        instructions.innerHTML = `<h3><strong>Dane dojazdu ${ kindOfTransport == "walking"
           ? "na pieszo:" : kindOfTransport == "cycling"  ? "rowerem:"
            : kindOfTransport == "driving"  ? "samochodem:"   : ""
        }</strong></h3>
        <h4>czas: ${Math.floor(data.duration / 60)} min ${
          kindOfTransport == "walking"  ? "🚶‍♂️": kindOfTransport == "cycling" ? "🚴:": kindOfTransport == "driving" ? "🚘" : ""
        } </h4>
        <h4>dystans: ${distanceKm} km </h4>`;
        updateTravelTime(Math.floor(data.duration / 60));
      } else {
        map.addLayer({
          id: "route",

          type: "line",
          source: {
            type: "geojson",
            data: geojson,
          },
          layout: {
            "line-join": "round",
            "line-cap": "round",
          },
          paint: {
            "line-color": "#3887be",
            "line-width": 5,
            "line-opacity": 0.75,
          },
        });
      }
    }

    if (!active) {
      map.on("load", () => {
        // Dodaj punkt startowy na mapę jako zielone kółko
        map.addLayer({
          id: "start",
          type: "circle",
          source: {
            type: "geojson",
            data: {
              type: "Feature",
              properties: {},
              geometry: {
                type: "Point",
                coordinates: startPoint,
              },
            },
          },
          paint: {
            "circle-radius": 10,
            "circle-color": "#00FF00", // Zielony kolor
          },
        });
      });
    }
    // map.on('load', () => {
    //   // Dodaj punkt startowy na mapę jako zielone kółko
    //   map.addLayer({
    //     id: 'start',
    //     type: 'circle',
    //     source: {
    //       type: 'geojson',
    //       data: {
    //         type: 'Feature',
    //         properties: {},
    //         geometry: {
    //           type: 'Point',
    //           coordinates: startPoint
    //         }
    //       }
    //     },
    //     paint: {
    //       'circle-radius': 10,
    //       'circle-color': '#00FF00' // Zielony kolor
    //     }
    //   });
    // });
    // Funkcja wywoływana po kliknięciu na mapie
    map.on("click", (event) => {
      const coords = Object.keys(event.lngLat).map((key) => event.lngLat[key]);

      if (active) {
        setStartPoint(coords)
      }
      // if (active) {
      //   const start = {
      //     type: "FeatureCollection",
      //     features: [
      //       {
      //         type: "Feature",
      //         properties: {},
      //         geometry: {
      //           type: "Point",
      //           coordinates: coords,
      //         },
      //       },
      //     ],
      //   };
      //   setStartPoint(coords);
      //   if (map.getLayer("start")) {
      //     map.getSource("start").setData(start);
      //   } else {
      //     map.addLayer({
      //       id: "end",
      //       type: "circle",
      //       source: {
      //         type: "geojson",
      //         data: {
      //           type: "FeatureCollection",
      //           features: [
      //             {
      //               type: "Feature",
      //               properties: {},
      //               geometry: {
      //                 type: "Point",
      //                 coordinates: coords,
      //               },
      //             },
      //           ],
      //         },
      //       },
      //       paint: {
      //         "circle-radius": 10,
      //         "circle-color": "#f30", //red
      //       },
      //     });
      //   }

      //   const selectedTransport = kindOfTransport;

      //   getRoute(startPoint, selectedTransport);
      // }

      const end = {
        type: "FeatureCollection",
        features: [
          {
            type: "Feature",
            properties: {},
            geometry: {
              type: "Point",
              coordinates: coords,
            },
          },
        ],
      };

      if (map.getLayer("end")) {
        map.getSource("end").setData(end);
      } else {
        map.addLayer({
          id: "end",
          type: "circle",
          source: {
            type: "geojson",
            data: {
              type: "FeatureCollection",
              features: [
                {
                  type: "Feature",
                  properties: {},
                  geometry: {
                    type: "Point",
                    coordinates: coords,
                  },
                },
              ],
            },
          },
          paint: {
            "circle-radius": 10,
            "circle-color": "#f30",
          },
        });
      }

      const selectedTransport = kindOfTransport;

      getRoute(coords, selectedTransport);

      getRoute(coords, selectedTransport);
if(active){
  setActive(!active)
}

      // if (travelTime == ''){
      //   return getRoute(coords, selectedTransport);}
    });
  }, [kindOfTransport, isPastVisible, isPlannedVisible, startPoint, active]);

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
            <select id="locationSelect">
              <option value="">Wybierz lokalizację</option>
              <option value="Gdynia">Gdynia</option>
              <option value="Gdańsk">Gdańsk</option>
              <option value="Sopot">Sopot</option>
            </select>
            <select id="travelKindSelect" onChange={handleTransportChange}>
              {" "}
              {/* value={kindOfTransport} */}
              <option
                value={kindOfTransport}
                onChange={(e) => {
                  setKindOfTransport(e.target.value);
                }}
              >
                Wybierz środek transportu
              </option>
              <option value="driving">samochod</option>
              <option value="cycling">rower</option>
              <option value="walking">pieszo</option>
              <option>inne</option>
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
          <div id="map" style={{ width: "100%", height: "100%" }} />
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
