export type Coordinate = {
  lat: number;
  lon: number;
};

export type LocationProps = {
  location: Location;
};

export type Location = {
  _id: string;
  name: string;
  coordinates: Coordinate;
};
