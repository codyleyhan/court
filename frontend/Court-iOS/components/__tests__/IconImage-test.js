import 'react-native';
import React from 'react';
import IconImage from '../IconImage';
import renderer from 'react-test-renderer';

it('Renders Default IconImage', () => {
  const tree = renderer.create(<IconImage size={100} avatar="sloth" color="#000"/>).toJSON();

  expect(tree).toMatchSnapshot();
});
