import React from 'react';
import { shallow } from 'enzyme';
import Upload from '../pages/upload';

test('Blank upload page renders correctly', () => {
  const component = shallow(<Upload />);
  expect(component).toMatchSnapshot();
});

// Now let's "upload a file" and test that it looks as expected
// test('Upload renders correctly', () => {
//   const wrapper = shallow(<Upload />);
//   wrapper.instance().handleClick();
//   // expect(wrapper).toMatchSnapshot();
// });
