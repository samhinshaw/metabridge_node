import React from 'react';
import { shallow } from 'enzyme';
import NavBar from '../components/navbar';

const mockRouter = {
  pathname: '/'
};

test('Search renders correctly', () => {
  const component = shallow(<NavBar router={mockRouter} />);
  expect(component).toMatchSnapshot();
});

// test('Search should render correct amount of shows', () => {
//   const component = shallow(<UnwrappedSearch shows={preload.shows} searchTerm="" />);
//   expect(component.find(ShowCard).length).toEqual(preload.shows.length);
// });
