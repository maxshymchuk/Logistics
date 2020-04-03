export enum CargoType {
  Container,
  Liquid,
  Dry,
  Breakbulk,
  RoRo
}

export enum CargoTypePriceRatio {
  Container = 1.5,
  Liquid = 3,
  Dry = 2,
  Breakbulk = 1,
  RoRo = 1
}

export type Cargo = {
  description: string;
  category: CargoType;
  mass: number;
  volume: number;
};
