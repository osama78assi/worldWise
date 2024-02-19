import { useEffect, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import { useUrlPosition } from "../../customsHooks/useUrlPosition";
import { v4 as uniqueId } from "uuid";

import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";

import styles from "./Form.module.css";

import Button from "./Button";
import Spinner from "../globalCompnent/Spinner";
import Message from "./Message";
import { useAppLayoutContext } from "../../contexts/AppLayoutContext";

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

const initialFormState = {
  status: "", // Loading, Ready, Error
  msg: "", // Error Message
  cityName: "",
  country: "",
  emoji: "",
  date: new Date(),
  notes: "",
};

function formReducer(state, action) {
  switch (action.type) {
    case "err":
      return { ...state, status: "err", msg: action.payload };
    case "loading":
      return { ...state, status: "loading", msg: "" };
    case "newItem":
      return {
        ...state,
        status: "ready",
        cityName: action.payload.city,
        country: action.payload.country,
        emoji: action.payload.emoji,
        msg: "",
      };
    case "city":
      return { ...state, cityName: action.payload, msg: "" };
    case "date":
      return { ...state, date: action.payload, msg: "" };
    case "note":
      return { ...state, notes: action.payload, msg: "" };
    default:
      throw new Error("Unkown Action");
  }
}

const BASE_URL = `https://api.bigdatacloud.net/data/reverse-geocode-client`;
const TIME_OUT = 10000; // ms

function timeOut() {
  return new Promise((_, rej) => {
    setTimeout(() => {
      rej(new Error("timeOut"));
    }, TIME_OUT);
  });
}

function Form() {
  const { createCity, loading } = useAppLayoutContext();
  const navigate = useNavigate();
  const [lat, lng] = useUrlPosition();
  const [{ status, cityName, country, msg, emoji, date, notes }, dispatchForm] =
    useReducer(formReducer, initialFormState);

  useEffect(() => {
    const requestController = new AbortController();
    if (!lat && !lng) {
      dispatchForm({
        type: "err",
        payload: "No City Selected Please Select One By Clicking On The Map",
      });
      return;
    }
    async function getReverseGeocoding() {
      try {
        dispatchForm({ type: "loading" });
        const req = await Promise.race([
          fetch(`${BASE_URL}?latitude=${lat}&longitude=${lng}`, {
            signal: requestController.signal,
          }),
          timeOut(),
        ]);
        const data = await req.json();
        if (!req.ok) throw new Error("Faild To Get The City Try Again");
        if (!data.countryCode)
          throw new Error("This Isn't Country Click On Another Place");
        dispatchForm({
          type: "newItem",
          payload: {
            city: data.city || data.locality || "",
            country: data.countryName,
            emoji: convertToEmoji(data.countryCode),
          },
        });
      } catch (err) {
        if (err.name !== "AbortError") {
          console.log(err.message);
          dispatchForm({ type: "err", payload: err.message });
        }
      }
    }
    getReverseGeocoding();
    return () => {
      requestController.abort();
    };
  }, [lat, lng]);

  async function handelSubmit(e) {
    e.preventDefault();
    if (!date || !cityName) return;
    const newCity = {
      cityName,
      country,
      emoji,
      date,
      notes,
      position: { lat, lng },
      id: uniqueId(),
    };
    await createCity(newCity);
    navigate("/app/cities");
  }

  return (
    <>
      {status == "err" && <Message message={msg} />}
      {status == "loading" && <Spinner />}
      {status == "ready" && (
        <form
          className={`${styles.form} ${loading ? styles.loading : ""}`}
          onSubmit={handelSubmit}
        >
          <div className={styles.row}>
            <label htmlFor="cityName">City name</label>
            <input
              id="cityName"
              onChange={(e) =>
                dispatchForm({ type: "city", payload: e.target.value })
              }
              value={cityName}
            />
            <span className={styles.flag}>{emoji}</span>
          </div>

          <div className={styles.row}>
            <label htmlFor="date">When did you go to {cityName}?</label>
            <DatePicker
              id="date"
              placeholderText="day/month/year"
              selected={date}
              dateFormat={"dd/MM/yyyy"}
              onChange={(date) => dispatchForm({ type: "date", payload: date })}
            />
          </div>

          <div className={styles.row}>
            <label htmlFor="notes">Notes about your trip to {cityName}</label>
            <textarea
              id="notes"
              onChange={(e) =>
                dispatchForm({ type: "note", payload: e.target.value })
              }
              value={notes}
            />
          </div>

          <div className={styles.buttons}>
            <Button type="primary">Add</Button>
            <Button
              type="back"
              onClick={(e) => {
                e.preventDefault();
                navigate(-1);
              }}
            >
              &larr; Back
            </Button>
          </div>
        </form>
      )}
    </>
  );
}

export default Form;
