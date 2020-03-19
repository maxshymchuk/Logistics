import * as qs from 'qs';

import { Location, UserPath } from '../../models/locations.models';
import {
    Order, orderModel, OrderMongo, OrderStatus, UserOrderInput
} from '../../models/orders.models';
import { Route } from '../../models/routes.models';
import { Track, TrackStatus } from '../../models/tracks.models';
import { User } from '../../models/users.models';
import { createPaths, getLocationByName } from '../locations/locations.service';
import { assignVehicle, getNearestVehicle } from '../vehicles/vehicles.service';

function getTrackNumber(): string {
  return "xxxx-xxxx".replace(/[x]/g, () =>
    ((Math.random() * 36) | 0).toString(36)
  );
}

async function findOrderById(_id: string) {
  const order = await orderModel
    .findOne({ _id })
    .catch<Order>(e => console.log(e));
  return order;
}

export async function getOrders() {
  const orders = await orderModel.find().catch<Order[]>(e => console.log(e));
  return orders;
}

export async function getOrderById(id: string) {
  const order = await findOrderById(id);
  return order;
}

export async function getOrderByTrackNumber(trackNumber: string) {
  const order = await orderModel
    .findOne({ trackNumber })
    .catch<Order>(e => console.log(e));
  return order;
}

export async function getOrdersByUsername(username: string) {
  const orders = await orderModel.find({ username }).catch<Order>(e => console.log(e));
  return orders;
}

export async function getOrderPaths(orderParams: string) {
  const userOrderInput: UserOrderInput = qs.parse(orderParams);
  const { from, to, message, cargos } = userOrderInput;
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
    userPaths.push({ cargos, message, price, distance, timeInterval, paths });
  }
  return userPaths;
}

function createTrack(route: Route) {
  const today = new Date();
  const status =
    route.departureDate <= today ? TrackStatus.Transit : TrackStatus.Pending;
  const track: Track = {
    status,
    route,
    departureDate: route.departureDate,
    arrivalDate: route.vehicle.arrivalDate
  };
  return track;
}

export async function updateOrders() {
  const today = new Date();
  const orders = await orderModel
    .find({ status: OrderStatus.Taken })
    .catch<OrderMongo[]>(e => console.log(e));
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
}

async function createRoutes(userPath: UserPath) {
  const routes: Route[] = [];
  let date = new Date();
  for (let path of userPath.paths) {
    const locations: Location[] = [];
    for (let route of path.routes) {
      const location = await getLocationByName(route);
      locations.push(location);
    }
    for (let i = 0; i < locations.length - 1; i++) {
      const nearestVehicle = await getNearestVehicle(
        path.vehicle,
        locations[i],
        date
      );
      const assignedVehicle = await assignVehicle(
        nearestVehicle,
        locations[i + 1]
      );
      date = assignedVehicle.arrivalDate;
      routes.push({
        startLocation: locations[i],
        endLocation: locations[i + 1],
        cargos: userPath.cargos,
        departureDate: nearestVehicle.arrivalDate,
        vehicle: assignedVehicle
      });
    }
  }
  return routes;
}

export async function addOrder(user: User, path: UserPath) {
  const routes = await createRoutes(path);
  const trackNumber = getTrackNumber();
  const order: Order = {
    message: path.message,
    tracks: [createTrack(routes[0])],
    username: user.username,
    price: path.price,
    status: OrderStatus.Taken,
    routes: routes,
    trackNumber: trackNumber
  };
  await orderModel.create(order, (err: Error) => err && console.log(err));
  return trackNumber;
}

export async function deleteOrderById(_id: string) {
  const tempOrder = await findOrderById(_id);
  if (tempOrder) {
    await orderModel.deleteOne({ _id }).catch(e => console.log(e));
    return `Order ${_id} deleted`;
  } else {
    return "Cannot find order to delete";
  }
}

export async function updateOrder(order: OrderMongo) {
  const tempOrder = await findOrderById(order._id);
  if (tempOrder) {
    await orderModel
      .updateOne({ _id: order._id }, order)
      .catch(e => console.log(e));
    return `Order ${order._id} updated`;
  } else {
    return "Cannot find order to update";
  }
}
