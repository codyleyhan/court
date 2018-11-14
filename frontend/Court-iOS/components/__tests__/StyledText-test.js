import 'react-native';
import React from 'react';
import { MonoText } from '../StyledText';
import renderer from 'react-test-renderer';

it('Renders Styled text', () => {
  // TODO(rivmist): change this to our custom text once loaded
  const tree = renderer.create(<MonoText>Snapshot test!</MonoText>).toJSON();

  expect(tree).toMatchSnapshot();
});
