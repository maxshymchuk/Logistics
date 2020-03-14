import axios from 'axios';

import { Vehicle } from '../models/vehicles.models';

export async function getVehiclesData(): Promise<Vehicle[]> {
  const res = (await axios.get("/vehicles")).data;
  return res;
}

export async function addVehicle(vehicle: Vehicle): Promise<string> {
  const res = (await axios.post("/vehicles", vehicle)).data;
  return res;
}

export async function removeVehicleById(id: string): Promise<string> {
  const res = (await axios.delete(`/vehicles/${id}`)).data;
  return res;
}