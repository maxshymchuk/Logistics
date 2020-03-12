import React, { Component } from "react";

import { CircularProgress } from "@material-ui/core";

import { User } from "../../../models/users.models";
import { getUsersData } from "../../../services/users.service";
import UserItem from "./UserItem";

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
        {!this.state.loaded && <CircularProgress />}
        <section className="users">
          {this.state.users.map((user: User) => {
            return <UserItem user={user} key={user._id} />;
          })}
        </section>
      </React.Fragment>
    );
  }
}

export default UsersList;
