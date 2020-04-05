import { createContext } from 'react';

export type AdminContextType = {
  isChanged: boolean;
};

export const defaultAdminState = {
  isChanged: false
};

export const AdminContext = createContext<AdminContextType>(defaultAdminState);