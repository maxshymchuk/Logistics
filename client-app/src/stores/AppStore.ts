import { action, configure, observable, runInAction } from 'mobx';
import { createContext } from 'react';

import { MessageType } from '../models/message.models';
import { User } from '../models/user.models';
import { logoutUser } from '../services/users.service';
import DialogStore from './DialogStore';

configure({ enforceActions: 'always' });

type NotifierType = {
  messageType: MessageType;
  message: string;
}

export class AppStore {
  
  @observable user: User | null = null;

  @observable isLogged = false;

  @observable notifier: NotifierType | undefined;

  private resetUser() {
    this.user = null;
    this.isLogged = false;
  }

  @action login(newUser: User) {
    if (newUser) {
      this.user = newUser;
      this.isLogged = true;
    }
  }

  @action async logout() {
    const response = await logoutUser();
    console.log(response.message);
    runInAction(() => {
      this.resetUser();
    });
  }

  @action setNotify(notify: NotifierType) {
    this.notifier = notify;
  }

  @action resetNotify() {
    this.notifier = undefined;
  }
}

export const AppContext = createContext(new AppStore());