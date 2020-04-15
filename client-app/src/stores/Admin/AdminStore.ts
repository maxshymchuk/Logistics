import { action, computed, observable } from 'mobx';
import { createContext } from 'react';

import DialogStore from '../DialogStore';
import LocationStore from './stores/LocationStore';
import OrderStore from './stores/OrderStore';
import UserStore from './stores/UserStore';
import VehicleStore from './stores/VehicleStore';

export enum Tab {
  Vehicles, Users, Locations, Orders
}

export class AdminStore {

  @observable currentTab = Tab.Vehicles;

  @observable dialog = new DialogStore();

  @observable vehicles = new VehicleStore();

  @observable users = new UserStore();

  @observable locations = new LocationStore();

  @observable orders = new OrderStore();

  @computed get content() {
    return this.getContent();
  }

  getContent() {
    switch (this.currentTab) {
      case Tab.Vehicles: return this.vehicles;
      case Tab.Users: return this.users;
      case Tab.Locations: return this.locations;
      case Tab.Orders: return this.orders;
      default: return this.vehicles;
    }
  }

  @action setTab(tab: Tab) {
    this.currentTab = tab;
  }
}

export const AdminContext = createContext(new AdminStore());