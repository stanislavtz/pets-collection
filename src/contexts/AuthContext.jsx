/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useContext } from "react";

export const AuthContext = createContext();

const initialUserValue = {
  _id: "",
  email: "",
  accessToken: "",
};

function getUserFromLS() {
  const userData = localStorage.getItem("user-data");

  return JSON.parse(userData);
}

export function AuthContextProvider({ children }) {
  const [user, setUser] = useState(getUserFromLS() || initialUserValue);

  function userLogin(userData) {
    setUser(userData);
  }

  function userLogout() {
    setUser(initialUserValue);
  }
  return (
    <AuthContext.Provider value={{ user, userLogin, userLogout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  const context = useContext(AuthContext);

  return context;
}
