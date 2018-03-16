import React, { Component } from 'react';
import { string, shape, arrayOf, func } from 'prop-types';
// import Link from 'next/link';
import glamorous from 'glamorous';
import { RadioGroup, Radio } from 'react-radio-group';

const RadioText = glamorous.span({
  marginLeft: '5px'
});

class RadioButtons extends Component {
  static propTypes = {
    groupName: string.isRequired,
    initiallyChecked: string.isRequired,
    options: arrayOf(
      shape({
        name: string.isRequired,
        id: string.isRequired
      })
    ).isRequired,
    onChange: func
  };

  static defaultProps = {
    onChange: () => {}
  };

  // For the default props, allow user to pass in default state
  state = {
    selectedValue: this.props.initiallyChecked
  };

  // We want onChange and onClick to be handled separately so React and the
  // browser play nice!
  handleChange = value => {
    this.setState({ selectedValue: value });
    // Pass the state back up to 'Upload'
    this.props.onChange(value);
  };

  // Need to migrate to react-radio-group!!
  // This might just be by putting this straight into the Upload component

  render() {
    // console.log(`state for ${this.props.optionName} is currently ${this.state.isChecked}`);
    return (
      <RadioGroup
        name={this.props.groupName}
        selectedValue={this.state.selectedValue}
        onChange={this.handleChange}
      >
        {this.props.options.map(option => (
          <label className="radio" htmlFor={option.id} key={option.id}>
            <Radio id={option.id} value={option.id} />
            <RadioText>{option.name}</RadioText>
          </label>
        ))}
      </RadioGroup>
    );
  }
}

export default RadioButtons;
