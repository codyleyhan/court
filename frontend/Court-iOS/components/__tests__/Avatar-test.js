import 'react-native';
import React from 'react';
import Avatar from '../Avatar';
import renderer from 'react-test-renderer';

it('Renders Default Avatar', () => {
  const tree = renderer.create(<Avatar width={200}/>).toJSON();

  expect(tree).toMatchSnapshot();
});
