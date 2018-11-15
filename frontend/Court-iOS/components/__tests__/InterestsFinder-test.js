import 'react-native';
import React from 'react';
import InterestsFinder from '../InterestsFinder';
import renderer from 'react-test-renderer';

it('Renders Default InterestsFinder', () => {
  const mocks = { onAddInterest: jest.fn(), onRemoveInterest: jest.fn() };
  const interests = {'kgs://12hv3': {title: 'The Office', description: 'American Sitcom', imgUrl: 'test.url'}};

  const tree = renderer.create(
    <InterestsFinder
      interests={interests}
      onAddInterest={mocks.onAddInterest}
      onRemoveInterest={mocks.onRemoveInterest}
    />
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
