import React, { Component } from 'react';
import UserItem from './UserItem';
import { User } from '../../models/users.models';
import { getUsersData } from '../../services/users.service';
import Loader, { LoaderType } from '../../components/Loader/Loader';

class UsersList extends Component<{}, { users: User[]; loaded: boolean }> {
  state = {
    users: [],
    loaded: false
  };

  async componentDidMount() {
    const users: User[] = await getUsersData();
    this.setState({ users, loaded: true });
  }

  render() {
    return (
      <React.Fragment>
        {!this.state.loaded && <Loader loaderType={LoaderType.Circle} />}
        <section className='users'>
          {this.state.users.map((user: User) => {
            return <UserItem user={user} key={user._id} />;
          })}
        </section>
      </React.Fragment>
    );
  }
}

export default UsersList;
