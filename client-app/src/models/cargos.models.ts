export enum CargoType {
  Container,
  Liquid,
  Dry,
  Breakbulk,
  RoRo
}

export type Cargo = {
  description: string;
  category: CargoType;
  mass: number;
  volume: number;
};

// https://www.portofantwerp.com/en/types-goods
