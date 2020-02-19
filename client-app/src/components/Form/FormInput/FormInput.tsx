import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';

export type FormSelectType = {
  _id: string;
  name: string;
};

class FormInput extends Component<{ label: string }> {
  state = {
    value: ''
  };

  render() {
    return (
      <FormControl style={{ width: '100%' }}>
        <TextField label={this.props.label} />
      </FormControl>
    );
  }
}

export default FormInput;
