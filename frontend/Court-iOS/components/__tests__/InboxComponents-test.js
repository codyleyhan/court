import 'react-native';
import React from 'react';
import { InboxItem } from '../InboxComponents';
import renderer from 'react-test-renderer';

it('Renders Default InboxCard', () => {
  const tree = renderer.create(
    <InboxItem
      name="River"
      lastTime="10:00 AM"
      lastMessage="Test Message"
      percent="60%"
      imgUrl="https://test.com/img.png"
    />
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
