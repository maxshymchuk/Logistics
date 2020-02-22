import React, { Component } from 'react';
import { Button, TextField } from '@material-ui/core';
import './timeChanger.scss';
import { changeTime } from '../../../../services/timeChanger.service';
import cogoToast from 'cogo-toast';

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
    cogoToast.success(`${route} ${this.state.value} day(s)!`, {
      hideAfter: 1,
      position: 'bottom-right'
    });
  };

  handleInput = (event: any) => {
    const target = event.target;
    if (target.value > 0)
      this.setState(state => ({
        value: target.value
      }));
  };

  render() {
    return (
      <section className='changer'>
        <Button color='inherit' onClick={() => this.handleChange('Minus')}>
          Minus
        </Button>
        <TextField
          size='small'
          className='changer-days'
          type='number'
          value={this.state.value}
          onChange={this.handleInput}
          variant='outlined'
        />
        <Button color='inherit' onClick={() => this.handleChange('Plus')}>
          Plus
        </Button>
      </section>
    );
  }
}

export default TimeChanger;
