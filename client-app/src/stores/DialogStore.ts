import { action, computed, observable } from 'mobx';

class DialogStore {

  @observable isDialogOpen = false;

  @computed get isOpen() {
    return this.isDialogOpen;
  }

  @action close() {
    this.isDialogOpen = false;
  }

  @action open() {
    this.isDialogOpen = true;
  }
}

export default DialogStore;