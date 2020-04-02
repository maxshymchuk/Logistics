export enum CargoType {
  Container = 'Container',
  Liquid = 'Liquid',
  Dry = 'Dry',
  Breakbulk = 'Breakbulk',
  RoRo = 'RoRo'
}

export type Cargo = {
  description: string;
  category: CargoType;
  mass: number;
  volume: number;
};

// https://www.portofantwerp.com/en/types-goods
