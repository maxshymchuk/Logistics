import * as fs from 'fs';

import {
    Location, locationModel, Map, mapModel, MapType, Path, PathInput
} from '../../models/locations.models';
import { getAirplaneRoutes, getRoutes } from './router';

async function findLocationById(_id: string) {
  const order = await locationModel
    .findOne({ _id })
    .catch<Location>(e => console.log(e));
  return order;
}

export async function getLocations() {
  const locations = await locationModel
    .find()
    .catch<Location[]>(e => console.log(e));
  return locations.sort((a: Location, b: Location) =>
    a.name > b.name ? 1 : -1
  );
}

export async function addLocation(location: Location) {
  locationModel.create(location, (err: Error) => err && console.log(err));
  return "Location added";
}

export async function getLocationByName(name: string) {
  const location = await locationModel
    .findOne({ name })
    .catch<Location>(e => console.log(e));
  return location;
}

export async function createPaths(pathInput: PathInput) {
  const { from, to } = pathInput;
  const paths: Path[][] = [];
  if (from !== to) {
    const airplaneRoutes = await getAirplaneRoutes(from, to);
    paths.push(airplaneRoutes);
    for (let mapType in MapType) {
      const path = await getRoutes(from, to, mapType as MapType);
      path.length && paths.push(path);
    }
  }
  return paths;
}

export async function regenerateLocations() {
  const citiesFile = await fs.readFileSync("data/cities.json");
  const cities: Location[] = JSON.parse(citiesFile.toString("utf8"));
  await locationModel.deleteMany({});
  for (let city of cities) {
    await locationModel.create(city, (err: Error) => err && console.log(err));
  }
}

export async function regenerateMaps() {
  const mapsFile = await fs.readFileSync("data/maps.json");
  const maps: Map[] = JSON.parse(mapsFile.toString("utf8"));
  await mapModel.deleteMany({});
  for (let map of maps) {
    await mapModel.create(map, (err: Error) => err && console.log(err));
  }
}

export async function deleteLocationById(_id: string) {
  const location = await findLocationById(_id);
  if (location) {
    await locationModel.deleteOne({ _id }).catch(e => console.log(e));
    return `Location ${_id} deleted`;
  } else {
    return "Cannot find location to delete";
  }
}