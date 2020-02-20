import React, { Component } from 'react';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';

type ControlsSelectProps = {
  label: string;
  options: any[];
  valueProp: string;
  textProp: string;
  isError: boolean;

  onChange: any;
};

class ControlsSelect extends Component<ControlsSelectProps, { value: string }> {
  state = {
    value: ''
  };

  handleChange = (event: any) => {
    this.setState(() => ({
      value: event.target.value
    }));
    this.props.onChange(event);
  };

  renderProps() {
    const res = this.props.options.map(option => {
      return (
        <MenuItem value={option[this.props.textProp]} key={option[this.props.valueProp]}>
          {option[this.props.textProp]}
        </MenuItem>
      );
    });
    return res;
  }

  render() {
    return (
      <FormControl error={this.props.isError} fullWidth>
        <InputLabel>{this.props.label}</InputLabel>
        <Select name={this.props.label.toLowerCase()} value={this.state.value} onChange={this.handleChange}>
          {this.renderProps()}
        </Select>
      </FormControl>
    );
  }
}

export default ControlsSelect;
