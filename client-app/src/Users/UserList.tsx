import React, { Component } from 'react';
import UserItem from './UserItem';
import { User } from './users.models';
import { getUsersData } from './users.service';

class UsersList extends Component<{}, { users: User[] }> {
  state = {
    users: []
  };

  async componentDidMount() {
    const users: User[] = await getUsersData();
    this.setState({ users });
  }

  render() {
    return (
      <section className='users'>
        {this.state.users.map((user: User) => {
          return <UserItem user={user} key={user._id} />;
        })}
      </section>
    );
  }
}

export default UsersList;
