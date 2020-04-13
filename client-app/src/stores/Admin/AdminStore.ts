import { observable } from 'mobx';
import { createContext } from 'react';
import DialogStore from './stores/DialogStore';

export class AdminStore {
  @observable currentTab = 0;

  @observable tabNumber = 0;

  @observable currentPage = 1;

  @observable dialog = new DialogStore();
}

export const AdminContext = createContext(new AdminStore());