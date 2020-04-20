import { action, computed, observable, reaction, runInAction } from 'mobx';
import { MessageType } from '../../../models/message.models';
import { Order } from '../../../models/order.models';
import { getOrdersData, removeOrderById } from '../../../services/orders.service';

const ITEMS_ON_PAGE = 20;

class OrderStore {

  @observable isLoaded = false;

  @observable list: Order[] = [];

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
    const response = await getOrdersData();
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

  @action async remove(id: string) {
    this.list = this.list.filter(order => order._id !== id);
    const response = await removeOrderById(id);
    return response;
  }
}

export default OrderStore;