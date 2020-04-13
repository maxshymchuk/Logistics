import { action, configure, observable, runInAction } from 'mobx';
import { createContext } from 'react';
import { User } from '../models/user.models';
import { logoutUser } from '../services/users.service';

configure({ enforceActions: 'always' });

export class AppStore {
  @observable user: User | null = null;

  @observable isLogged: boolean = false;

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
}

export const AppContext = createContext(new AppStore());