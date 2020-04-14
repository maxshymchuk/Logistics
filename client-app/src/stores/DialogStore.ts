import { action, computed, observable } from 'mobx';

import { ServerResponse } from '../models/message.models';

type DialogType = {
  data: ServerResponse<any> | null,
  isOpen: boolean
};

class DialogStore {

  @observable dialog: DialogType = {
    data: null,
    isOpen: false
  };

  @computed get result() {
    return this.dialog.data;
  }

  @computed get isOpen() {
    return this.dialog.isOpen;
  }

  @action reset() {
    this.dialog.data = null;
  }

  @action set(result: ServerResponse<any>) {
    this.dialog.data = result;
  }

  @action close() {
    this.dialog.isOpen = false;
  }

  @action open() {
    this.dialog.isOpen = true;
  }
}

export default DialogStore;