import AddIcon from '@material-ui/icons/Add';
import cogoToast from 'cogo-toast';
import React, { Component } from 'react';
import RemoveIcon from '@material-ui/icons/Remove';
import { changeTime } from '../../../services/timeChanger.service';
import { IconButton, TextField } from '@material-ui/core';
import './timeChanger.scss';

class TimeChanger extends Component {
  state = {
    value: ''
  };

  componentDidMount() {
    this.setState(state => ({
      value: 1
    }));
  }

  handleChange = (route: string) => {
    changeTime(`/${route}/${this.state.value}`);
    cogoToast
      .success(`${route} ${this.state.value} day(s)!`, {
        hideAfter: 1,
        position: 'bottom-right'
      })
      .then(() => {
        window.location.reload(false);
      });
  };

  handleInput = (event: any) => {
    const target = event.target;
    if (target.value >= 0)
      this.setState(state => ({
        value: target.value
      }));
  };

  render() {
    return (
      <section className='changer'>
        <IconButton onClick={() => this.handleChange('Minus')}>
          <RemoveIcon className='changer-icons' fontSize='small' />
        </IconButton>
        <TextField
          size='small'
          className='changer-days'
          type='number'
          value={this.state.value}
          onChange={this.handleInput}
          variant='outlined'
        />
        <IconButton onClick={() => this.handleChange('Plus')}>
          <AddIcon className='changer-icons' fontSize='small' />
        </IconButton>
      </section>
    );
  }
}

export default TimeChanger;
