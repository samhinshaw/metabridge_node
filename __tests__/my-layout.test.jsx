import React, { Fragment } from 'react';
import { shallow } from 'enzyme';
import Layout from '../components/my-layout';
import mockChildren from '../__mocks__/children';

// Currently running into issues testing this. It does not affect the other test,
// so it most certainly is related to the mock children.

const TestLayout = () => (
  <Fragment>
    <Layout>{mockChildren}</Layout>
  </Fragment>
);

test('Search renders correctly', () => {
  const component = shallow(<TestLayout />);
  expect(component).toMatchSnapshot();
});
