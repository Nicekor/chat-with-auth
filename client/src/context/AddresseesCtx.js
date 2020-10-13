import React, { createContext, useCallback, useEffect, useState } from 'react';

export const AddresseesContext = createContext();

export const AddresseesProvider = ({ children }) => {
  const [addressees, setAddressees] = useState([]);

  const loadAddressees = useCallback(async () => {
    const res = await fetch('http://192.168.1.157:5000/api/addressees', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    const addressees = await res.json();
    setAddressees(addressees);
  }, []);

  useEffect(() => {
    loadAddressees();
  }, [loadAddressees]);

  return (
    <AddresseesContext.Provider value={[addressees, setAddressees]}>
      {children}
    </AddresseesContext.Provider>
  );
};

export default AddresseesProvider;
