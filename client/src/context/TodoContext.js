import React, { createContext, useState } from "react";

export const TodoContext = createContext();

export const TodoProvider = ({ children }) => {
  const [refresh, setRefresh] = useState(false);

  const toggleRefresh = () => {
    setRefresh((prevState) => !prevState);
  };

  return (
    <TodoContext.Provider value={{ refresh, toggleRefresh }}>
      {children}
    </TodoContext.Provider>
  );
};
