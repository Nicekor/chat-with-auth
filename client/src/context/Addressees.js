import React, { createContext, useState } from 'react';
import { addressees as addresseesJson } from '../utils/dummyData';

export const AddresseesContext = createContext();

export const AddresseesProvider = ({ children }) => {
  const [addressees, setAddressees] = useState(addresseesJson);

  return (
    <AddresseesContext.Provider value={{ addressees, setAddressees }}>
      {children}
    </AddresseesContext.Provider>
  );
};

export default AddresseesProvider;
