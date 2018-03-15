import React from 'react';
import { shallow } from 'enzyme';
import Button from '../components/button';

test('Search renders correctly', () => {
  const component = shallow(
    <Button className="button is-large is-link" title="Tutorial" link="/help/tutorial" />
  );
  expect(component).toMatchSnapshot();
});
