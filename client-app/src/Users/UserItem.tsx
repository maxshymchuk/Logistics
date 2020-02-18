import React, { Component } from 'react';
import { UserProps } from './users.models';
import './users.scss';

class UserItem extends Component<UserProps> {
  render() {
    const { name, surname, birthday, email, login, phone } = this.props.user;
    return (
      <div className='users__item'>
        <div className='user-name'>Name: {name}</div>
        <div className='user-surname'>Surname: {surname}</div>
        <div className='user-birthday'>Birthday: {new Date(birthday).toDateString()}</div>
        <div className='user-email'>Email: {email}</div>
        <div className='user-login'>Login: {login}</div>
        <div className='user-phone'>Phone: {phone}</div>
      </div>
    );
  }
}

export default UserItem;
