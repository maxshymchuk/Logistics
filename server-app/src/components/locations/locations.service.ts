import * as fs from 'fs';
import { mapModel, Location, Map, MapType, Path, PathInput, locationModel } from '../../models/locations.models';
import { getAirplaneRoutes, getRoutes } from './router';

export async function getLocations() {
  const locations = await locationModel.find().catch<Location[]>(e => console.log(e));
  return locations;
}

export async function getLocationByName(name: string) {
  const location = await locationModel.findOne({ name }).catch<Location>(e => console.log(e));
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
  const cities: Location[] = JSON.parse((await fs.readFileSync('data/cities.json')).toString('utf8'));
  await locationModel.deleteMany({});
  for (let city of cities) {
    await locationModel.create(city, (err: Error) => err && console.log(err));
  }
}

export async function regenerateMaps() {
  const maps: Map[] = JSON.parse((await fs.readFileSync('data/maps.json')).toString('utf8'));
  await mapModel.deleteMany({});
  for (let map of maps) {
    await mapModel.create(map, (err: Error) => err && console.log(err));
  }
}
