import { action, computed, observable, reaction } from 'mobx';
import { Vehicle } from '../../../models/vehicle.models';

const ITEMS_ON_PAGE = 20;


class VehicleStore {

  @observable vehicles: Vehicle[] = [];

  @observable pageNumber = 0;

  @observable currentPage = 1;

  reaction = reaction(
    () => this.vehicles.length,
    () => this.setPageNumber(Math.floor(this.vehicles.length / ITEMS_ON_PAGE))
  );

  @computed get page() {
    const group = this.vehicles.slice(
      this.currentPage * ITEMS_ON_PAGE, 
      (this.currentPage + 1) * ITEMS_ON_PAGE
    );
    return group;
  }

  @action setPageNumber(pages: number) {
    this.pageNumber = pages;
  }

  @action setPage(page: number) {
    this.currentPage = page;
  }

  @action update(vehicles: Vehicle[]) {
    this.vehicles = vehicles;
  }

  @action remove(id: string) {
    this.vehicles = this.vehicles.filter(item => item._id !== id);
  }
}

export default VehicleStore;