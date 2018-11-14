import 'react-native';
import React from 'react';
import GenderSelector from '../GenderSelector';
import renderer from 'react-test-renderer';

it('Renders GenderSelector', () => {
  const mocks = { onGenderSelected: jest.fn(), onPreferenceSelected: jest.fn() };

  const tree = renderer.create(
    <GenderSelector
      onGenderSelected={mocks.onGenderSelected}
      onPreferenceSelected={mocks.onPreferenceSelected}
    />
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
