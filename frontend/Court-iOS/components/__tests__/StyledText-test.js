import 'react-native';
import React from 'react';
import { RegularText } from '../StyledText';
import renderer from 'react-test-renderer';

it('Renders Styled text', () => {
  // TODO(rivmist): change this to our custom text once loaded
  const tree = renderer.create(<RegularText>Snapshot test!</RegularText>).toJSON();

  expect(tree).toMatchSnapshot();
});
