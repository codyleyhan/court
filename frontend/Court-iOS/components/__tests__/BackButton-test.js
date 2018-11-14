import 'react-native';
import React from 'react';
import Avatar from '../BackButton';
import renderer from 'react-test-renderer';

it('Renders BackButton with navigation', () => {
  const navigation = { navigate: jest.fn() };

  const tree = renderer.create(<BackButton navigation={navigation}/>).toJSON();

  expect(tree).toMatchSnapshot();
});
