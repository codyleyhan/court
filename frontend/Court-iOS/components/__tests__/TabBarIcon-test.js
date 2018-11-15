import 'react-native';
import React from 'react';
import TabBarIcon from '../TabBarIcon';
import renderer from 'react-test-renderer';

it('Renders Default TabBarIcon', () => {
  const onPress = jest.fn();
  const tree = renderer.create(
    <TabBarIcon
      name="md-chatbubbles"
      focused={true}
    />
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
