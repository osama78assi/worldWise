import { useState } from "react";

/**
 *
 * @param {object} defaultPosition {latitude, longitude}
 * @param {function} setter
 * @returns
 * @description Return The Position As {latitude, longitude}
 *  With Loading State And Error Message
 */
function useGeolocation(defaultPosition = null) {
  const [isLoading, setIsLoading] = useState(false);
  const [position, setPosition] = useState(defaultPosition);
  const [error, setError] = useState(null);
  function getLocation(setter = null) {
    if (setter === null)
      throw new Error("Must Pass A Function To Set Position");
    if (!navigator.geolocation)
      return setError("Your Browser Doesn't Support Geolocation");
    setIsLoading(() => true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setter({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        setPosition({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        setIsLoading(() => false);
      },
      (err) => {
        setError(err.message);
        setIsLoading(() => false);
      }
    );
  }
  return { position, isLoading, error, getLocation };
}

export { useGeolocation };
