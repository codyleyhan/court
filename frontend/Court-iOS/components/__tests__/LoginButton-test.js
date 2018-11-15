import 'react-native';
import React from 'react';
import LoginButton from '../LoginButton';
import renderer from 'react-test-renderer';

it('Renders Default LoginButton', () => {
  const onPress = jest.fn();
  const tree = renderer.create(<LoginButton onPress={onPress} showLogo={true} text="Continue with Facebook" />).toJSON();

  expect(tree).toMatchSnapshot();
});
