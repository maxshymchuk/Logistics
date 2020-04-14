import { action, observable } from 'mobx';
import { createContext } from 'react';

import DialogStore from '../DialogStore';
import VehicleStore from './stores/VehicleStore';

export enum Tab {
  Vehicles, Users, Locations, Orders
}

export class AdminStore {

  @observable currentTab = Tab.Vehicles;

  @observable dialog = new DialogStore();

  @observable content = new VehicleStore();

  @action setTab(tab: number) {
    this.currentTab = tab;
  }
}

export const AdminContext = createContext(new AdminStore());