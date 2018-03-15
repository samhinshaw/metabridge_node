import React from 'react';
import { shallow } from 'enzyme';
import Layout from '../components/my-layout';
import mockChildren from '../__mocks__/children';

test('Search renders correctly', () => {
  const component = shallow(<Layout>{mockChildren}</Layout>);
  expect(component).toMatchSnapshot();
});
