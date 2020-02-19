import { InputState } from '../pages/Orders/Order';

export type OrderProps = {
  order: InputState;
};

export type Order = {
  from: string;
  to: string;
  who: string;
  cargos: string[];
  vehicle: string;
  message: string;
};
