import React from 'react';
import { shallow } from 'enzyme';
import Upload from '../pages/upload';

test('Blank upload page renders correctly', () => {
  const component = shallow(<Upload />);
  expect(component).toMatchSnapshot();
});

// Now let's "upload a file" and test that it looks as expected

// ? I shouldn't bother testing this, because I should refactor this to parse the
// ? data on the front end, and then just hit my server's API (yet to be written)
// ? for the mapping data

// test('Upload renders correctly', () => {
//   const wrapper = shallow(<Upload />);
//   wrapper.instance().uploadFile();
//   // expect(wrapper).toMatchSnapshot();
// });
