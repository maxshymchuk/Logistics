import { action, configure, observable, runInAction } from 'mobx';
import { createContext } from 'react';
import { isOfType } from '../helpers/typeGuard';

import { MessageType } from '../models/message.models';
import { User } from '../models/user.models';
import { authUser, getLoggedUser, logoutUser, regUser } from '../services/users.service';

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

  private setUser(user: User) {
    this.user = user;
    this.isLogged = true;
  }

  @action async requestIsLog() {
    const response = await getLoggedUser();
    runInAction(() => {
      this.isRequestLoginStatus = false;
      if (isOfType<User>(response.data, 'username')) {
        this.setUser(response.data);
      }
    });
    return response;
  }

  @action async login(username: string, password: string) {
    const response = await authUser({ username, password });
    runInAction(() => {
      if (isOfType<User>(response.data, 'username')) {
        this.setUser(response.data);
      }
    });
    return response;
  }

  @action async register(newUser: User) {
    const response = await regUser(newUser);
    runInAction(() => {
      this.login(newUser.username, newUser.password);
    });
    return response;
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