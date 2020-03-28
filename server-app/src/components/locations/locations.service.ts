import * as fs from 'fs';

import { errorMsg, successMsg } from '../../helpers/messages';
import {
    Location, locationModel, Map, mapModel, MapType, Path, PathInput
} from '../../models/location.models';
import { Message } from '../../models/message.models';
import { getAirplaneRoutes, getRoutes } from './router';

async function findLocationById(id: string) {
  const order = await locationModel.findById(id);
  return order;
}

export async function getLocations() {
  try {
    const locations = await locationModel.find();
    const result = locations.sort((a: Location, b: Location) =>
      a.name > b.name ? 1 : -1
    );
    return successMsg(result);
  } catch (err) {
    return errorMsg(`Error while getting locations (${err})`);
  }
}

export async function addLocation(location: Location) {
  try {
    await locationModel.create(location);
    return successMsg(`Location "${location.name}" successfully added`);
  } catch (err) {
    return errorMsg(`Error while adding location (${err})`);
  }
}

export async function getLocationByName(name: string) {
  try {
    const location = await locationModel.findOne({ name })
    return successMsg(location);
  } catch (err) {
    return errorMsg(`Error while searching location (${err})`);
  }
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
  try {
    const citiesFile = await fs.readFileSync("data/cities.json");
    const cities: Location[] = JSON.parse(citiesFile.toString("utf8"));
    await locationModel.deleteMany({});
    for (let city of cities) {
      await locationModel.create(city);
    }
    return successMsg('Successful regeneration of locations');
  } catch (err) {
    return errorMsg(`Error while regenerating locations (${err})`);
  }
}

export async function regenerateMaps() {
  try {
    const mapsFile = await fs.readFileSync("data/maps.json");
    const maps: Map[] = JSON.parse(mapsFile.toString("utf8"));
    await mapModel.deleteMany({});
    for (let map of maps) {
      await mapModel.create(map);
    }
    return successMsg('Successful regeneration of maps');
  } catch (err) {
    return errorMsg(`Error while regenerating maps (${err})`);
  }
}

export async function deleteLocationById(id: string): Promise<Message<string>> {
  try {
    const location = await findLocationById(id);
    if (location) {
      await locationModel.findByIdAndDelete(id);
      return successMsg(`Successful delete of "${location.name}" (${id})`);
    } else {
      return errorMsg(`Cannot find location to delete (${id})`);
    }
  } catch (err) {
    return errorMsg(`Error while deleting location (${err})`);
  }
}