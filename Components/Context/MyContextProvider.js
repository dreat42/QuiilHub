import React, { createContext, useState } from 'react';

const MyContext = createContext();

const MyContextProvider = ({ children }) => {
  const [itemId, setItemId] = useState(null);

  return (
    <MyContext.Provider value={{ itemId, setItemId }}>
      {children}
    </MyContext.Provider>
  );
};

export { MyContext, MyContextProvider };
