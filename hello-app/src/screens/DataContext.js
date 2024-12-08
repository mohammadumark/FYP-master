import React, { createContext, useContext, useState } from 'react';

const EmailContext = createContext();
const NameContext = createContext();

export const EmailProvider = ({ children }) => {
  const [email, setEmail] = useState('');

  const saveEmail = (newEmail) => {
    setEmail(newEmail);
  };

  return (
    <EmailContext.Provider value={{ email, saveEmail }}>
      {children}
    </EmailContext.Provider>
  );
};

export const useEmail = () => {
  return useContext(EmailContext);
};

// Name Provider
export const NameProvider = ({ children }) => {
  const [name, setName] = useState('');

  const saveName = (newName) => {
    setName(newName);
  };

  return (
    <NameContext.Provider value={{ name, saveName }}>
      {children}
    </NameContext.Provider>
  );
};

export const useName = () => {
  return useContext(NameContext);
};
