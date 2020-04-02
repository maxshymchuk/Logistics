import { createContext } from 'react';

import { User } from '../models/user.models';

export type LoginContextState = {
  user: User | undefined;
  isLogged: boolean;
};

export type LoginContextType = LoginContextState & {
  login: (value: LoginContextState) => void;
  logout: () => void;
};

export const defaultLoginState: LoginContextState = {
  user: undefined,
  isLogged: false
};

export const LoginContext = createContext<LoginContextType>({
  ...defaultLoginState,
  login: () => {},
  logout: () => {}
});
