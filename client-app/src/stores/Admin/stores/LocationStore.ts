import { action, computed, observable, reaction, runInAction } from 'mobx';
import { Location } from '../../../models/location.models';
import { MessageType } from '../../../models/message.models';
import { addLocation, getLocationsData, removeLocationById } from '../../../services/locations.service';

const ITEMS_ON_PAGE = 20;

class LocationStore {

  @observable isLoaded = false;

  @observable list: Location[] = [];

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
    const response = await getLocationsData();
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

  @action async add(location: Location) {
    this.list.push(location);
    const response = await addLocation(location);
    return response;
  }

  @action async remove(id: string) {
    this.list = this.list.filter(location => location._id !== id);
    const response = await removeLocationById(id);
    return response;
  }
}

export default LocationStore;