import React, { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import translations from "./translations";

import clubsAndOtherLocations from "./ClubsAndOtherLocations";

function MapComponent({
  selectedSport,
  kindOfTransport,
  startPoint,
  setStartPoint,
  active,
  setActive,
  updateDistance,
  updateTravelTime,
  language
}) {
  const mapRef = useRef(null);
  useEffect(() => {
    mapboxgl.accessToken = `${process.env.REACT_APP_API_KEY}`; 
    if (mapRef.current) {
      return;
    }

    mapRef.current = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/mapbox/streets-v12",
      center: [18.4293, 54.4293],
      zoom: 1,
    });

    const map = mapRef.current;

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);
  useEffect(() => {
    const map = mapRef.current;

    if (!map) return;

    
    const bounds = [
      [18.2893, 54.2593], // sw/se Południowo-zachodni narożnik
      [18.6693, 54.6493], // Północno-wschodni narożnik
    ];
    map.setMaxBounds(bounds);
    // Dodaj markery do mapy
    clubsAndOtherLocations[0].clubs.forEach(function (club) {
      
      if (club.type === "badminton" && selectedSport === "Badminton") {
        var el = document.createElement("div");
        el.className = "marker " + club.type;

        new mapboxgl.Marker(el)
          .setLngLat(club.coordinates)
          .setPopup(new mapboxgl.Popup().setHTML(
            `<h3>${club.name[language]}</h3>`
          ))
          .addTo(map);
      } else if (club.type === "tennis" && selectedSport.includes("Tennis")) {
        var el = document.createElement("div");
        el.className = "marker " + club.type;

       
        new mapboxgl.Marker(el)
          .setLngLat(club.coordinates)
          .setPopup(new mapboxgl.Popup().setHTML(
            `<h3>${club.name[language]}</h3>`
          ))
          .addTo(map);
      } else if (
        club.type === "tennis_stolowy" &&
        selectedSport.includes("Table")
      ) {
        var el = document.createElement("div");
        el.className = "marker " + club.type;

        new mapboxgl.Marker(el)
          .setLngLat(club.coordinates)
          .setPopup(new mapboxgl.Popup().setHTML(
            `<h3>${club.name[language]}</h3>`
          ))
          .addTo(map);
      } else if (
        club.type === "padel" &&
        selectedSport.includes("Paddleball")
      ) {
        var el = document.createElement("div");
        el.className = "marker " + club.type;

        new mapboxgl.Marker(el)
          .setLngLat(club.coordinates)
          .setPopup(new mapboxgl.Popup().setHTML(
            `<h3>${club.name[language]}</h3>`
          ))
          .addTo(map);
      } else if (!selectedSport) {
        var el = document.createElement("div");
        el.className = "marker " + club.type;

        new mapboxgl.Marker(el)
          .setLngLat(club.coordinates)
          .setPopup(new mapboxgl.Popup().setHTML(
            `<h3>${club.name[language]}</h3>`
          ))
          .addTo(map);
      }
      // create a HTML element for each feature
    });
    clubsAndOtherLocations[1].nonInstitutionActivities.forEach(
      function (place) {
        if (
          place.type === "running/walking" &&
          selectedSport.includes("Running")
        ) {
          var el = document.createElement("div");
          el.className = "marker " + place.type;

          new mapboxgl.Marker(el)
            .setLngLat(place.coordinates)
            .setPopup(new mapboxgl.Popup().setHTML(
              `<h3>${place.name[language]}</h3>`
            ))
            .addTo(map);
        }
      },
    );
  }, [selectedSport, language]);
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    const updateStartPoint = () => {
      const start = {
        type: "Feature",
        properties: {},
        geometry: {
          type: "Point",
          coordinates: startPoint,
        },
      };

      if (map.getSource("start")) {
        map.getSource("start").setData(start);
      } else {
        map.addSource("start", {
          type: "geojson",
          data: start,
        });

        map.addLayer({
          id: "start",
          type: "circle",
          source: "start",
          paint: {
            "circle-radius": 10,
            "circle-color": "#00FF00",
          },
        });
      }
    };

    if (map.isStyleLoaded()) {
      updateStartPoint();
    } else {
      map.once("load", updateStartPoint);
    }
  }, [startPoint]);
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    async function getRoute(end, kindOfTransport) {
      let profile = "walking";

      if (kindOfTransport === "driving") {
        profile = "driving";
      } else if (kindOfTransport === "cycling") {
        profile = "cycling";
      }

      const query = await fetch(
        `https://api.mapbox.com/directions/v5/mapbox/${profile}/${startPoint[0]},${startPoint[1]};${end[0]},${end[1]}?steps=true&geometries=geojson&access_token=${mapboxgl.accessToken}`,
        { method: "GET" },
      );

      const json = await query.json();
      const data = json.routes[0];

      const geojson = {
        type: "Feature",
        properties: {},
        geometry: {
          type: "LineString",
          coordinates: data.geometry.coordinates,
        },
      };

      if (map.getSource("route")) {
        map.getSource("route").setData(geojson);
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

      const distanceKm = (data.distance / 1000).toFixed(2);

      updateDistance(distanceKm);
      updateTravelTime(Math.floor(data.duration / 60));

      const instructions = document.getElementById("instructions");

      if (instructions) {
  instructions.innerHTML = `
    <h3>
      <strong>
        ${translations[language].travelData} ${
          kindOfTransport === "walking"
            ? translations[language].walkingRoute
            : kindOfTransport === "cycling"
              ? translations[language].cyclingRoute
              : kindOfTransport === "driving"
                ? translations[language].drivingRoute
                : ""
        }:
      </strong>
    </h3>

    <h4>
      ${translations[language].time.toLowerCase()}: ${Math.floor(
        data.duration / 60,
      )} min
      ${
        kindOfTransport === "walking"
          ? "🚶‍♂️"
          : kindOfTransport === "cycling"
            ? "🚴"
            : kindOfTransport === "driving"
              ? "🚘"
              : ""
      }
    </h4>

    <h4>
      ${translations[language].distance.toLowerCase()}: ${distanceKm} km
    </h4>
  `;
}
    }

    const handleMapClick = (event) => {
      const coords = [event.lngLat.lng, event.lngLat.lat];

      console.log("KLIK MAPY, ACTIVE:", active);
      console.log("WSPÓŁRZĘDNE:", coords);

      // Aktywny wybór punktu startowego
      if (active) {
        console.log("USTAWIAM NOWY PUNKT STARTOWY:", coords);

        if (map.getLayer("route")) {
          map.removeLayer("route");
        }

        if (map.getSource("route")) {
          map.removeSource("route");
        }
        if (map.getLayer("end")) {
          map.removeLayer("end");
        }

        if (map.getSource("end")) {
          map.removeSource("end");
        }

        setStartPoint(coords);
        setActive(false);

        return;
      }

      // Normalne kliknięcie → punkt końcowy + trasa
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

      if (map.getSource("end")) {
        map.getSource("end").setData(end);
      } else {
        map.addLayer({
          id: "end",
          type: "circle",
          source: {
            type: "geojson",
            data: end,
          },
          paint: {
            "circle-radius": 10,
            "circle-color": "#f30",
          },
        });
      }

      getRoute(coords, kindOfTransport);
    };

    map.on("click", handleMapClick);

    return () => {
      map.off("click", handleMapClick);
    };
  }, [kindOfTransport, startPoint, active]);

  return <div id="map" style={{ width: "100%", height: "100%" }} />;
}

export default MapComponent;
