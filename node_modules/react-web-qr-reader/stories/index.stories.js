import React, { Component } from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Reader from '../dist';

class Wrapper extends Component {
  constructor(props) {
    super(props);
    this.state = { facingMode: 'environment', delay: 500, on: true };
  }
  render() {
    const { selectFacingMode, selectDelay, onAndOff } = this.props;

    return (
      <div style={{ width: '400px', margin: 'auto' }}>
        {onAndOff && (
          <button onClick={() => this.setState({ on: !this.state.on })}>
            {this.state.on ? 'Turn off' : 'Turn on'}
          </button>
        )}
        {selectFacingMode && (
          <select
            onChange={(e) => this.setState({ facingMode: e.target.value })}
          >
            <option value="environment">Environment</option>
            <option value="user">User</option>
          </select>
        )}
        {selectDelay && (
          <div>
            <button onClick={() => this.setState({ delay: false })}>
              Disable Delay
            </button>
            <input
              placeholder="Delay in ms"
              type="number"
              value={this.state.delay}
              onChange={(e) =>
                this.setState({ delay: parseInt(e.target.value) })
              }
            />
          </div>
        )}
        {this.state.on && (
          <Reader
            onError={action('Error')}
            onScan={action('Scan')}
            onLoad={action('Load')}
            onImageLoad={action('ImageLoad')}
            onImageLoad={action('ImageLoad')}
            ref="reader"
            facingMode={this.state.facingMode}
            maxImageSize={1000}
            delay={this.state.delay}
            className="reader-container"
          />
        )}
      </div>
    );
  }
}

storiesOf('QR Reader', module)
  .add('FacingMode not specified', () => <Wrapper />)
  .add('Choose facingMode', () => <Wrapper selectFacingMode />)
  .add('Choose delay', () => <Wrapper selectDelay />)
  .add('On and off', () => <Wrapper onAndOff />);
