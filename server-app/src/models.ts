export type CustomResponse = {
  status: {
    content: any,
    code: number,
  },
  isFound: boolean
}

export enum TrackStatus {
  Pending = 'pending', 
  Transit = 'transit', 
  Finish = 'finish'
}

export enum VehicleType {
  Plain = 'plain',
  Car = 'car',
  Train = 'train'
}

export type Vehicle = {
  destination: Location,
  date: Date,
  type: VehicleType
}

export type Destination = {
  point: Location,
  targets: string[],
  date: Date,
  vehicle: VehicleType
}

export type Location = {
  name: string,
  coordinates: {
    north: number,
    east: number
  }
}

export type Route ={
  startLocation: Location,
  endLocation: Location,
  cargos: string[],
  departureDate: Date,
  vehicle: Vehicle
}

export type Track = {
  route: Route,
  status: TrackStatus,
  departureDate: Date,
  arrivalDate: Date
}

export type Order = {
  description: string,
  tracks: Track[],
  userId: string,
  price: number,
  status: boolean,
  routes: Route[]
}