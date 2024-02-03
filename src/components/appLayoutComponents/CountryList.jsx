import { useOutletContext } from "react-router-dom";
import styles from "./CountryList.module.css";
import Spinner from "../globalCompnent/Spinner";
import Message from "./Message";
import CountryItem from "./CountryItem";
import { useAppLayoutContext } from "../../contexts/AppLayoutContext";

function CountryList() {
  const { cities, loading } = useAppLayoutContext();
  if (loading) return <Spinner />;

  if (!cities.length)
    return (
      <Message
        message={"Add You First Country By Clicking On A Country On The Map"}
      />
    );
  const countries = [];

  return (
    <ul className={styles.countryList}>
      {cities.map((city) => {
        if (!countries.includes(city.country)) {
          countries.push(city.country);
          return <CountryItem key={city.id} country={city} />;
        }
      })}
    </ul>
  );
}

export default CountryList;
