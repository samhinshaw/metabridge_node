import React from 'react';
import { shallow } from 'enzyme';
import RadioButtons from '../components/radio-buttons';
import radioButtonOptions from '../__mocks__/radio-button-options';

test('Search renders correctly', () => {
  const component = shallow(<RadioButtons {...radioButtonOptions} />);
  expect(component).toMatchSnapshot();
});
