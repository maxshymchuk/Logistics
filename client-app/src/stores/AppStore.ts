import { action, configure, observable, runInAction } from 'mobx';
import { createContext } from 'react';
import { isOfType } from '../helpers/typeGuard';

import { MessageType } from '../models/message.models';
import { User } from '../models/user.models';
import { getLoggedUser, logoutUser } from '../services/users.service';

configure({ enforceActions: 'always' });

type NotifierType = {
  messageType: MessageType;
  message: string;
};

export class AppStore {
  
  @observable user?: User;

  @observable isLogged = false;

  @observable notifier: NotifierType | undefined;

  @observable isRequestLoginStatus = true;

  private resetUser() {
    this.user = undefined;
    this.isLogged = false;
  }

  @action async requestIsLog() {
    const response = await getLoggedUser();
    if (response.messageType !== MessageType.Error) {
      runInAction(() => {
        if (isOfType<User>(response.data, 'username')) {
          this.login(response.data);
          this.isRequestLoginStatus = false;
        }
      });
    }
    return response;
  }

  @action login(newUser: User) {
    if (newUser) {
      this.user = newUser;
      this.isLogged = true;
    }
  }

  @action async logout() {
    await logoutUser();
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