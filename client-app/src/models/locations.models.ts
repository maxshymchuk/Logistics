export type Coordinate = {
  lat: number;
  lon: number;
};

export type Location = {
  _id: string;
  name: string;
  coordinates: Coordinate;
};
