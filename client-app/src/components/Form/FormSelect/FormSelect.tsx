import React, { Component } from 'react';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';

export type FormSelectType = {
  _id: string;
  name: string;
};

class FormSelect extends Component<{ label: string; options: FormSelectType[] | string[] }, { value: string }> {
  state = {
    value: ''
  };

  handleChange = (e: any, value: any) => {
    this.setState({ value: value.props.value }, () => {
      console.log('New Value ', this.state.value);
    });
  };

  renderObject() {
    const res = (this.props.options as FormSelectType[]).map(option => {
      return (
        <MenuItem value={option.name} key={option._id}>
          {option.name}
        </MenuItem>
      );
    });
    return res;
  }

  renderArray() {
    return (this.props.options as string[]).map(option => {
      return (
        <MenuItem value={option} key={option}>
          {option}
        </MenuItem>
      );
    });
  }

  render() {
    return (
      <FormControl>
        <InputLabel>{this.props.label}</InputLabel>
        <Select name={this.props.label} value={this.state.value} onChange={this.handleChange}>
          {typeof this.props.options[0] === 'object' ? this.renderObject() : this.renderArray()}
        </Select>
      </FormControl>
    );
  }
}

export default FormSelect;
