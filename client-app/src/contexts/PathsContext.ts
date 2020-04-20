import { createContext } from 'react';

export type PathsContextType = {
  isSelectChanged: boolean;
};

export const defaultPathsState = {
  isSelectChanged: false
};

export const PathsContext = createContext<PathsContextType>(defaultPathsState);