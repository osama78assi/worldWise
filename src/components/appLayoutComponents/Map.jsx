import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import {
  MapContainer,
  TileLayer,
  Popup,
  Marker,
  useMap,
  useMapEvents,
} from "react-leaflet";

import { useAppLayoutContext } from "../../contexts/AppLayoutContext";
import { useGeolocation } from "../../customsHooks/useGeolocation";
import { useUrlPosition } from "../../customsHooks/useUrlPosition";
import styles from "./Map.module.css";
import Button from "./Button";

function MapC({ toggle }) {
  const { cities } = useAppLayoutContext();
  const [mapPosition, setMapPosition] = useState([40, -9]);
  const { position, isLoading, getLocation } = useGeolocation();
  const [mapLat, mapLng] = useUrlPosition();
  useEffect(() => {
    if (mapLat && mapLng) setMapPosition([mapLat, mapLng]);
  }, [mapLat, mapLng]);

  return (
    <div className={styles.mapContainer}>
      {!position && (
        <Button type="position" onClick={() => getLocation(setMapPosition)}>
          {isLoading ? "Loading..." : "Get My Position"}
        </Button>
      )}
      <MapContainer
        center={mapPosition}
        zoom={6}
        scrollWheelZoom={true}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {cities.map((city) => (
          <Marker position={city.position} key={city.id}>
            <Popup>
              <span>{city.emoji}</span>
              <span>{city.cityName}</span>
            </Popup>
          </Marker>
        ))}
        <SyncMap position={mapPosition} />
        <ShowForm toggle={toggle} />
      </MapContainer>
    </div>
  );
}

// To Sync The Map With The User
function SyncMap({ position }) {
  const map = useMap();
  map.setView(position);
  return null;
}

// Show Form While Clicking On The Map
function ShowForm({toggle}) {
  // function handelClicks(e) {
  //   navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`);
  // }
  // const navigate = useNavigate();
  // const map = useMap();
  // useEffect(() => {
  //   map.addEventListener("click", handelClicks);
  //   return () => {
  //     map.removeEventListener("click", handelClicks);
  //   };
  // }, []);
  const navigate = useNavigate();

  useMapEvents({
    click: (e) => {
      navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`);
      toggle()
    },
  });

  return null;
}

export default MapC;
