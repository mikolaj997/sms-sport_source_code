import React, { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

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
}
) {
    const mapRef = useRef(null);
    useEffect(() => {
        mapboxgl.accessToken = `${process.env.REACT_APP_API_KEY}`; // {do_usuniecia} - to abym widział efekty na zywo bez marnowania requestów api
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
        // let map;
        // const getMap = () => {
        //   map = new mapboxgl.Map({
        //     container: "map",
        //     style: "mapbox://styles/mapbox/streets-v12",
        //     center: [18.4293, 54.4293],
        //     zoom: 1,
        //   });
        // };
        // getMap();
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
                .setPopup(new mapboxgl.Popup().setHTML(`<h3>${place.name}</h3>`))
                .addTo(map);
            }
          },
        );
        }, [selectedSport]);
        useEffect(() => {
          const map = mapRef.current;
          if (!map) return;
    
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
              { method: "GET" },
            );
            query = query1;
          } else if (kindOfTransport === "cycling") {
            const query1 = await fetch(
              `https://api.mapbox.com/directions/v5/mapbox/cycling/${startPoint[0]},${startPoint[1]};${end[0]},${end[1]}?steps=true&geometries=geojson&access_token=${mapboxgl.accessToken}`,
              { method: "GET" },
            );
            query = query1;
          } else {
            const query1 = await fetch(
              `https://api.mapbox.com/directions/v5/mapbox/walking/${startPoint[0]},${startPoint[1]};${end[0]},${end[1]}?steps=true&geometries=geojson&access_token=${mapboxgl.accessToken}`,
              { method: "GET" },
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
          let distanceKm;
          if (map.getSource("route")) {
            map.getSource("route").setData(geojson);
            const instructions = document.getElementById("instructions");
            distanceKm = (data.distance / 1000).toFixed(2);
            updateDistance(distanceKm);
            instructions.innerHTML = `<h3><strong>Dane dojazdu ${
              kindOfTransport == "walking"
                ? "na pieszo:"
                : kindOfTransport == "cycling"
                  ? "rowerem:"
                  : kindOfTransport == "driving"
                    ? "samochodem:"
                    : ""
            }</strong></h3>
            <h4>czas: ${Math.floor(data.duration / 60)} min ${
              kindOfTransport == "walking"
                ? "🚶‍♂️"
                : kindOfTransport == "cycling"
                  ? "🚴:"
                  : kindOfTransport == "driving"
                    ? "🚘"
                    : ""
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
            setStartPoint(coords);
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
          if (active) {
            setActive(!active);
          }
    
          // if (travelTime == ''){
          //   return getRoute(coords, selectedTransport);}
        });
      }, [kindOfTransport, startPoint, active]);
    
  return (
    <div
      id="map"
      style={{ width: "100%", height: "100%" }}
    />
  );
}

export default MapComponent;