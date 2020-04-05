export enum CargoType {
  Container = 'Container',
  Liquid = 'Liquid',
  Dry = 'Dry',
  Breakbulk = 'Breakbulk',
  RoRo = 'RoRo'
}

export const cargoTypes = [
  CargoType.Container,
  CargoType.Liquid,
  CargoType.Dry,
  CargoType.Breakbulk,
  CargoType.RoRo
]

export type Cargo = {
  description: string;
  category: CargoType;
  mass: number;
  volume: number;
};

// https://www.portofantwerp.com/en/types-goods
