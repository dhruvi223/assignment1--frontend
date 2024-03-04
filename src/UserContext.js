import React, { createContext, useContext, useState } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState(() => {
    const storedDataS = localStorage.getItem("user");
    return storedDataS ? JSON.parse(storedDataS) : null;
  });

  return (
    <UserContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);