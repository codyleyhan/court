import 'react-native';
import React from 'react';
import InterestsCloud from '../InterestsCloud';
import renderer from 'react-test-renderer';

it('Renders Default InterestsCloud', () => {
  const mocks = { onAddInterest: jest.fn(), onRemoveInterest: jest.fn() };
  const interests = {'kgs://12hv3': {title: 'The Office', description: 'American Sitcom', imgUrl: 'test.url'}};
  const recommendations = [{id: 'kgs://jsh12', title: 'Interest Rec 1'}, {id: 'kgs://3jh43', title: 'Interest Rec 2'}];
  const tree = renderer.create(
    <InterestsCloud
      interests={interests}
      recommendations={recommendations}
      onAddInterest={mocks.onAddInterest}
      onRemoveInterest={mocks.onRemoveInterest}
    />
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
