import { action, observable } from 'mobx';
import { createContext } from 'react';
import { ServerResponse } from '../models/message.models';

export class AdminStore {
  @observable currentTab = 0;

  @observable tabNumber = 0;

  @observable currentPage = 1;

  @observable dialogResult: ServerResponse<any> | null = null;

  @action
  resetDialogResult() {
    this.dialogResult = null;
  }

  @action
  closeDialog() {
    this.
  }
}

export const AdminContext = createContext(new AdminStore());