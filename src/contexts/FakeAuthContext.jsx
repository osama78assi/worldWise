import { createContext, useContext, useEffect, useReducer } from "react";

const initialState = {
  user: null,
  isAuthenticate: false,
  isLoading: false,
};

// Used For Simulate Just
const FAKE_USER = {
  name: "Osama",
  email: "o@example.com",
  password: "qwerty",
  avatar: "https://i.pravatar.cc/100?u=zz",
};

const fakeAuth = createContext();

function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: true };
    case "finish":
      return { ...state, isLoading: false };
    case "login":
      return { ...state, user: action.payload, isAuthenticate: true };
    case "logout":
      return { ...state, user: null, isAuthenticate: false };
    default:
      throw new Error("Unkonw Action");
  }
}

function AuthProvider({ children }) {
  const [{ user, isAuthenticate, isLoading }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(() => {
    if (sessionStorage.getItem("loged")) {
      dispatch({ type: "login", payload: FAKE_USER });
    }
  }, []);

  async function login(email, password) {
    // Here In Must Be API Call But It's Fake In The End
    // if (email === FAKE_USER.email && password === FAKE_USER.password) {
    //   dispatch({ type: "login", payload: FAKE_USER });
    //   sessionStorage.setItem("loged", "k");
    // }
    const logging = await new Promise((res, _) => {
      dispatch({ type: "loading" });
      setTimeout(() => {
        res();
      }, 2000);
    }).then(() => {
      if (email === FAKE_USER.email && password === FAKE_USER.password) {
        dispatch({ type: "login", payload: FAKE_USER });
        sessionStorage.setItem("loged", "k");
      }
      dispatch({ type: "finish" });
    });
  }

  function logout() {
    dispatch({ type: "logout" });
    sessionStorage.removeItem("loged");
  }

  return (
    <fakeAuth.Provider
      value={{ user, isAuthenticate, isLoading, login, logout }}
    >
      {children}
    </fakeAuth.Provider>
  );
}

function useFakeAuth() {
  const fakeContext = useContext(fakeAuth);
  if (fakeContext === undefined)
    throw new Error("The UseFakeAuth Used Outside FakeAuth Component");
  return fakeContext;
}

export { AuthProvider, useFakeAuth };
