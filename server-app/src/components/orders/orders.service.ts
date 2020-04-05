import * as qs from 'qs';

import { errorResponse, successResponse } from '../../helpers/response';
import { Location, UserPath } from '../../models/location.models';
import { MessageType } from '../../models/message.models';
import {
    Order, orderModel, OrderMongo, OrderStatus, UserOrderInput
} from '../../models/order.models';
import { Route } from '../../models/route.models';
import { Track, TrackStatus } from '../../models/track.models';
import { User } from '../../models/user.models';
import { createPaths, getLocationByName } from '../locations/locations.service';
import { assignVehicle, getNearestVehicle } from '../vehicles/vehicles.service';

function getTrackNumber() {
  return "xxxx-xxxx".replace(/[x]/g, () =>
    ((Math.random() * 36) | 0).toString(36)
  );
}

async function findOrderById(id: string) {
  const order = await orderModel.findById(id);
  return order;
}

export async function getOrders() {
  try {
    const orders = await orderModel.find();
    if (orders.length) {
      return successResponse<Order[]>('Success', orders);
    } else {
      return errorResponse<string>('Cannot find orders');
    }
  } catch (err) {
    return errorResponse<string>(`Error while getting orders (${err})`);
  }
}

export async function getOrderById(id: string) {
  try {
    const order = await findOrderById(id);
    if (order) {
      return successResponse<Order>('Success', order);
    } else {
      return errorResponse<string>('Cannot find order');
    }
  } catch (err) {
    return errorResponse<string>(`Error while searching order (${err})`);
  }
}

export async function getOrderByTrackNumber(trackNumber: string) {
  try {
    const order = await orderModel.findOne({ trackNumber });
    if (order) {
      return successResponse<Order>('Success', order);
    } else {
      return errorResponse<string>('Cannot find order');
    }
  } catch (err) {
    return errorResponse<string>(`Error while searching order (${err})`);
  }
}

export async function getOrdersByUsername(username: string) {
  try {
    const orders = await orderModel.find({ username });
    if (orders.length) {
      return successResponse<Order[]>('Success', orders);
    } else {
      return errorResponse<string>('Cannot find orders');
    }
  } catch (err) {
    return errorResponse<string>(`Error while getting orders (${err})`);
  }
}

export async function getOrderPaths(orderParams: string) {
  try {
    const userOrderInput: UserOrderInput = qs.parse(orderParams);
    const { from, to, message, cargo } = userOrderInput;
    const pathsList = await createPaths({ from, to });
    const userPaths: UserPath[] = [];
    for (let i = 0; i < pathsList.length; i++) {
      const paths = pathsList[i].map(path => {
        return { ...path, timeInterval: Math.ceil(path.timeInterval) };
      });
      const price = pathsList[i]
        .map(path => path.price)
        .reduce((acc, cur) => (acc += cur), 0);
      const distance = pathsList[i]
        .map(path => path.distance)
        .reduce((acc, cur) => (acc += cur), 0);
      const timeInterval = paths
        .map(path => path.timeInterval)
        .reduce((acc, cur) => (acc += cur), 0);
      userPaths.push({ cargo, message, price: +price.toFixed(2), distance, timeInterval, paths });
    }
    if (userPaths.length) {
      return successResponse<UserPath[]>('Success', userPaths);
    } else {
      return errorResponse<string>('Cannot create paths');
    }
  } catch (err) {
    return errorResponse<string>(`Error while creating paths (${err})`);
  }
}

function createTrack(route: Route) {
  const today = new Date();
  const status = route.departureDate <= today ? TrackStatus.Transit : TrackStatus.Pending;
  const track: Track = {
    status, route,
    departureDate: route.departureDate,
    arrivalDate: route.vehicle.arrivalDate
  };
  return track;
}

export async function updateOrders() {
  try {
    const today = new Date();
    const orders = await orderModel.find({ status: OrderStatus.Taken })
    for (let order of orders) {
      const routesLength = order.routes.length;
      const lastTrack = order.tracks[order.tracks.length - 1];
      if (lastTrack.departureDate <= today && lastTrack.arrivalDate > today) {
        lastTrack.status = TrackStatus.Transit;
      } else if (lastTrack.arrivalDate <= today) {
        lastTrack.status = TrackStatus.Completed;
        if (order.tracks.length === routesLength) {
          order.status = OrderStatus.Completed;
        } else {
          const route = order.routes[order.tracks.length];
          const newTrack = createTrack(route);
          order.tracks.push(newTrack);
        }
      }
      await orderModel.updateOne({ _id: order._id }, order);
    }
    return successResponse<string>(`Successful orders update`);
  } catch (err) {
    return errorResponse<string>(`Error while updating orders (${err})`);
  }
}

async function createRoutes(userPath: UserPath) {
  const routes: Route[] = [];
  let date = new Date();
  for (let path of userPath.paths) {
    const locations: Location[] = [];
    for (let route of path.routes) {
      const locationResponse = await getLocationByName(route);
      if (locationResponse.messageType === MessageType.Error) {
        throw locationResponse.message
      }
      const location = locationResponse.data;
      locations.push(location);
    }
    for (let i = 0; i < locations.length - 1; i++) {
      const nearestVehicleResponse = await getNearestVehicle(
        path.vehicle,
        locations[i],
        date
      );
      if (nearestVehicleResponse.messageType === MessageType.Error) {
        throw nearestVehicleResponse.message;
      }
      const nearestVehicle = nearestVehicleResponse.data;
      const assignedVehicleResponse = await assignVehicle(
        nearestVehicle,
        locations[i + 1]
      );
      if (assignedVehicleResponse.messageType === MessageType.Error) {
        throw assignedVehicleResponse.message;
      }
      const assignedVehicle = assignedVehicleResponse.data;
      date = assignedVehicle.arrivalDate;
      const route: Route = {
        startLocation: locations[i],
        endLocation: locations[i + 1],
        cargo: userPath.cargo,
        departureDate: nearestVehicle.arrivalDate,
        vehicle: assignedVehicle
      };
      routes.push(route);
    }
  }
  return routes;
}

export async function addOrder(user: User, path: UserPath) {
  try {
    const trackNumber = getTrackNumber();
    const routes = await createRoutes(path);
    const order: Order = {
      message: path.message,
      tracks: [createTrack(routes[0])],
      username: user.username,
      price: path.price,
      status: OrderStatus.Taken,
      routes, trackNumber
    };
    await orderModel.create(order);
    return successResponse(trackNumber);
  } catch (err) {
    return errorResponse(`Error while adding order (${err})`);
  }
}

export async function deleteOrderById(id: string) {
  try {
    const foundOrder = await findOrderById(id);
    if (foundOrder) {
      await orderModel.findByIdAndDelete(id);
      return successResponse(`Successful delete of "${foundOrder.trackNumber}" (${id})`);
    } else {
      return errorResponse(`Cannot find order to delete (${id})`);
    }
  } catch (err) {
    return errorResponse(`Error while deleting order (${err})`);
  }
}

export async function updateOrder(order: OrderMongo) {
  try {
    const foundOrder = await findOrderById(order._id);
    if (foundOrder) {
      await orderModel.updateOne({ _id: order._id }, order);
      return successResponse<string>(`Successful update of "${order.trackNumber}" (${order._id})`);
    } else {
      return errorResponse<string>(`Cannot find order to update (${order._id})`);
    }
  } catch (err) {
    return errorResponse<string>(`Error while updating order (${err})`);
  }
}
