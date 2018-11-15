import 'react-native';
import React from 'react';
import Header from '../Header';
import renderer from 'react-test-renderer';

it('Renders Default Header', () => {
  const tree = renderer.create(<Header text="Test Header"/>).toJSON();

  expect(tree).toMatchSnapshot();
});
