import * as mongoose from 'mongoose';

export type CustomResponse = {
  status: {
    content: any,
    code: number,
  },
  isFound: boolean
}

export interface Location extends Partial<mongoose.Document> {
  name: string,
  coordinates: Coordinate
}

export type Coordinate = {
  lat: number,
  lon: number
}