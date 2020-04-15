import { action, computed, observable } from 'mobx';

import { ServerResponse } from '../models/message.models';

type DialogType = {
  data: ServerResponse<any> | null,
  isOpen: boolean
};

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