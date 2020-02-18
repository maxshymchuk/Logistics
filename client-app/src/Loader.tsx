import React, { Component } from 'react';

export enum LoaderType {
  Circle,
  Linear
}

class Loader extends Component<{ loaderType: LoaderType }> {
  renderSwitch(loaderType: LoaderType) {
    switch (loaderType) {
      case LoaderType.Circle:
        return (
          <div style={{ display: 'flex', justifyContent: 'center', margin: '.5rem' }}>
            <div className='lds-ripple'>
              <div></div>
              <div></div>
            </div>
          </div>
        );
      case LoaderType.Linear:
        return (
          <div style={{ display: 'flex', justifyContent: 'center', margin: '.5rem' }}>
            <div className='lds-ellipsis'>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
        );
    }
  }

  render() {
    return this.renderSwitch(this.props.loaderType);
  }
}

export default Loader;
