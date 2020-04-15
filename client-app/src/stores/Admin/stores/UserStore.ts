import { action, computed, observable, reaction, runInAction } from 'mobx';
import { MessageType } from '../../../models/message.models';
import { User } from '../../../models/user.models';
import { addUser, getUsersData, removeUserById } from '../../../services/users.service';

const ITEMS_ON_PAGE = 20;

class UserStore {

  @observable isLoaded = false;

  @observable list: User[] = [];

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
    const response = await getUsersData();
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

  @action setPageNumber(pages: number) {
    this.pageNumber = pages;
  }

  @action setPage(page: number) {
    this.currentPage = page;
  }

  @action async add(user: User) {
    this.list.push(user);
    const response = await addUser(user);
    return response;
  }

  @action async remove(id: string) {
    this.list = this.list.filter(user => user._id !== id);
    const response = await removeUserById(id);
    return response;
  }
}

export default UserStore;