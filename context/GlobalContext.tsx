"use client";
import { GlobalPreloadContext } from "module";
import { createContext, useContext, useState } from "react";

// create context
const GlobalContext = createContext();

// create provider
export function GlobalProvider({ children }) {
  const [unreadMessageCount, setUnreadMessageCount] = useState(0);

  return (
    <GlobalContext.Provider
      value={{
        unreadMessageCount,
        setUnreadMessageCount,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}

export function useGlobalContext() {
  return useContext(GlobalContext);
}
