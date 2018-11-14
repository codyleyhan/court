import 'react-native';
import React from 'react';
import BackButton from '../BackButton';
import renderer from 'react-test-renderer';

it('Renders BackButton with navigation', () => {
  const navigation = { navigate: jest.fn() };

  // These are expected, and can be used later
  consoleSpy = jest.spyOn(console, "error").mockImplementation();
  consoleSpyWarn = jest.spyOn(console, "warn").mockImplementation();

  const tree = renderer.create(<BackButton navigation={navigation}/>).toJSON();

  expect(tree).toMatchSnapshot();
});
