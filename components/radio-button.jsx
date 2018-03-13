import React, { Component } from 'react';
import { string, bool } from 'prop-types';
// import Link from 'next/link';
import glamorous from 'glamorous';

const RadioLabel = glamorous.span({
  marginLeft: '5px'
});

class RadioButton extends Component {
  // For the default props, allow user to pass in default state
  state = {
    isChecked: this.props.initiallyChecked
  };

  // We want onChange and onClick to be handled separately so React and the
  // browser play nice!
  handleCheckboxChange = event => {
    console.log('checkbox changed!', event.target.checked);
    this.setState({ isChecked: event.target.checked });
  };

  // Need to migrate to react-radio-group!!
  // This might just be by putting this straight into the Upload component

  render() {
    console.log(`state for ${this.props.optionName} is currently ${this.state.isChecked}`);
    return (
      <label className="radio" htmlFor={this.props.id}>
        <input
          type="radio"
          name={this.props.groupName}
          id={this.props.id}
          onChange={this.handleCheckboxChange}
          checked={this.state.isChecked}
        />
        <RadioLabel>{this.props.optionName}</RadioLabel>
      </label>
    );
  }
}

RadioButton.propTypes = {
  groupName: string.isRequired,
  optionName: string.isRequired,
  id: string.isRequired,
  initiallyChecked: bool
};

RadioButton.defaultProps = {
  initiallyChecked: false
};

export default RadioButton;
