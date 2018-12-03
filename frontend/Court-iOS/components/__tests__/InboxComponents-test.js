import 'react-native';
import React from 'react';
import { InboxItem } from '../InboxComponents';
import renderer from 'react-test-renderer';

it('Renders Default InboxCard', () => {
	const lastMessage = {text: 'I like the office', createdAt: '12:40 PM GMT'};
	const profile = {animal: 'bear', color: 'teal', first_name: 'John', percent_unlocked: 12};
  const tree = renderer.create(
    <InboxItem
      profile={profile}
      lastMessage={lastMessage}
    />
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
