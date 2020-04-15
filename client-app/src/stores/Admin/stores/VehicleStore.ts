import { action, computed, observable, reaction, runInAction } from 'mobx';
import { MessageType } from '../../../models/message.models';
import { Vehicle } from '../../../models/vehicle.models';
import { addVehicle, getVehiclesData, removeVehicleById } from '../../../services/vehicles.service';

const ITEMS_ON_PAGE = 20;

class VehicleStore {

  @observable isLoaded = false;

  @observable list: Vehicle[] = [];

  @observable pageNumber = 0;

  @observable currentPage = 1;

  reaction = reaction(
    () => this.list.length,
    length => this.setPageNumber(Math.ceil(length / ITEMS_ON_PAGE))
  );

  @computed get page() {
    const group = this.list.slice(
      (this.currentPage - 1) * ITEMS_ON_PAGE,
      this.currentPage * ITEMS_ON_PAGE
    );
    return group;
  }

  @action async init() {
    const response = await getVehiclesData();
    if (!this.isLoaded && response.messageType !== MessageType.Error) {
      runInAction(() => {
        if (response.data instanceof Array) {
          this.list = response.data;
          this.isLoaded = true;
        }
      });
    }
    return response;
  }

  @action async update() {
    this.isLoaded = false;
    const response = await this.init();
    return response;
  }

  @action setPageNumber(pages: number) {
    this.pageNumber = pages;
  }

  @action setPage(page: number) {
    this.currentPage = page;
  }

  @action async add(vehicle: Vehicle) {
    this.list.push(vehicle);
    const response = await addVehicle(vehicle);
    return response;
  }

  @action async remove(id: string) {
    this.list = this.list.filter(vehicle => vehicle._id !== id);
    const response = await removeVehicleById(id);
    return response;
  }
}

export default VehicleStore;