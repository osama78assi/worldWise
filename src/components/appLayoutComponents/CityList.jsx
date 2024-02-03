import styles from "./CityList.module.css";
import Spinner from "../globalCompnent/Spinner";
import CityItem from "./CityItem";
import Message from "./Message";
import { useAppLayoutContext } from "../../contexts/AppLayoutContext";

function CityList() {
  // const {data} = useOutletContext();
  // Custom Hook To Access Data From Context API(For Applayout)
  const { cities, loading } = useAppLayoutContext();
  if (loading) return <Spinner />;

  if (!cities.length)
    return (
      <Message message="Add Your First City By Clicking On A City On The Map" />
    );

  return (
    <ul className={styles.cityList}>
      {cities.map((city) => (
        <CityItem city={city} key={city.id} />
      ))}
    </ul>
  );
}

export default CityList;
