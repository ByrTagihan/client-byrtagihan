// SelectedBillIdsContext.js
import { createContext, useContext, useState } from "react";

const SelectedBillIdsContext = createContext();

export const SelectedBillIdsProvider = ({ children }) => {
  const [selectedBillIds, setSelectedBillIds] = useState([]);

  const value = {
    selectedBillIds,
    setSelectedBillIds,
  };

  return (
    <SelectedBillIdsContext.Provider value={value}>
      {children}
    </SelectedBillIdsContext.Provider>
  );
};

export const useSelectedBillIds = () => {
  const context = useContext(SelectedBillIdsContext);
  if (!context) {
    throw new Error(
      "useSelectedBillIds must be used within a SelectedBillIdsProvider"
    );
  }
  return context;
};
