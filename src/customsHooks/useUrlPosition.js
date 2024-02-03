import { useSearchParams } from "react-router-dom";

/**
 *
 * @returns Array Of Latitude And Longitude Of The Data In The URL
 */
function useUrlPosition() {
  const [searchString] = useSearchParams();
  const lat = searchString.get("lat");
  const lng = searchString.get("lng");
  return [lat, lng];
}

export { useUrlPosition };
