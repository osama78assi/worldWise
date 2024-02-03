import {
  createContext,
  useState,
  useEffect,
  useContext,
  useReducer,
  useCallback,
} from "react";
import { useLocalstorage } from "../customsHooks/useLocalstorage";

const appContext = createContext();
const BASE_URL = "http://localhost:9000/cities";
const initialState = {
  cities: [],
  loading: false,
  curCity: {},
};

function appReducer(state, action) {
  switch (action.type) {
    case "load":
      return { ...state, loading: true };
    case "finish":
      return { ...state, loading: false };
    case "cities/delete":
      return {
        ...state,
        cities: state.cities.filter((city) => city.id !== action.payload),
        curCity: {},
      };
    case "cities/load":
      return { ...state, cities: action.payload };
    case "cities/create":
      return {
        ...state,
        cities: [...state.cities, action.payload],
        curCity: action.payload,
      };
    case "cities/setCurCity":
      return { ...state, curCity: action.payload };
  }
}

function AppLayoutContext({ children }) {
  const [{ cities, loading, curCity }, dispatch] = useReducer(
    appReducer,
    initialState
  );
  // Get Cities In Initial Render
  // Using Fake API
  // useEffect(() => {
  //   async function getCities() {
  //     try {
  //       dispatch({ type: "load" });
  //       const req = await fetch(BASE_URL);
  //       const data = await req.json();
  //       dispatch({ type: "cities/load", payload: data });
  //     } catch (err) {
  //       console.log(err.message);
  //       alert(err.message);
  //     } finally {
  //       dispatch({ type: "finish" });
  //     }
  //   }
  //   getCities();
  // }, []);

  // Using Local Storage
  const [citiesLocal, setCityLocal, delCityLocal] = useLocalstorage("cities");
  useEffect(() => {
    dispatch({ type: "load" });
    setTimeout(() => {
      dispatch({ type: "cities/load", payload: citiesLocal });
      dispatch({ type: "finish" });
    }, 500);
  }, []);

  // Get City
  // Fake API
  // const getCity = useCallback(
  //   async function getCity(id) {
  //     if (id === curCity.id) return;
  //     try {
  //       dispatch({ type: "load" });
  //       const req = await fetch(`${BASE_URL}/${id}`);
  //       const data = await req.json();
  //       dispatch({ type: "cities/setCurCity", payload: data });
  //     } catch (err) {
  //       console.log(err.message);
  //     } finally {
  //       dispatch({ type: "finish" });
  //     }
  //   },
  //   [curCity.id]
  // );

  // Using Local Storage
  const getCity = useCallback(
    function getCity (id) {
      if (id === curCity.id) return;
      dispatch({ type: "load" });
      setTimeout(() => {
        const city = citiesLocal.filter((c) => c.id === id);
        dispatch({ type: "cities/setCurCity", payload: city[0] });
        dispatch({ type: "finish" });
      }, 500);
    },
    [curCity.id]
  );

  // Create New City
  // Using Fake API
  // async function createCity(cityObject) {
  //   try {
  //     dispatch({ type: "load" });
  //     const req = await fetch(`${BASE_URL}`, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(cityObject),
  //     });
  //     if (!req.ok) throw new Error("Faild While Creating A New City");
  //     const data = await req.json();
  //     dispatch({ type: "cities/create", payload: data });
  //   } catch (err) {
  //     console.log(err.message);
  //     alert("Something Went Wrong");
  //   } finally {
  //     dispatch({ type: "finish" });
  //   }
  // }

  // Using Local Storage
  function createCity(cityObject) {
    dispatch({ type: "load" });
    setTimeout(() => {
      setCityLocal(cityObject);
      dispatch({ type: "cities/create", payload: cityObject });
      dispatch({ type: "finish" });
    }, 500);
  }

  // Delete City
  // Using Fake API
  // async function deleteCity(id) {
  //   try {
  //     dispatch({ type: "load" });
  //     const req = await fetch(`${BASE_URL}/${id}`, {
  //       method: "DELETE",
  //     });
  //     if (!req.ok) throw new Error("Faild While Deleting The City");
  //     dispatch({ type: "cities/delete", payload: id });
  //   } catch (err) {
  //     console.log(err.message);
  //     alert(err.message);
  //   } finally {
  //     dispatch({ type: "finish" });
  //   }
  // }

  // Using Local Storage
  function deleteCity(id) {
    dispatch({ type: "load" });
    setTimeout(() => {
      dispatch({ type: "cities/delete", payload: id });
      delCityLocal(id);
      dispatch({type: "finish"})
    }, 500);
  }

  return (
    <appContext.Provider
      value={{
        cities,
        loading,
        curCity,
        getCity,
        createCity,
        deleteCity,
      }}
    >
      {children}
    </appContext.Provider>
  );
}

function useAppLayoutContext() {
  const appStates = useContext(appContext);
  if (appStates === undefined)
    throw new Error("Hook Used Outside AppLayout Component");
  return appStates;
}

export { AppLayoutContext, useAppLayoutContext };
