import 'react-native';
import React from 'react';
import InterestsItem from '../InterestsItem';
import renderer from 'react-test-renderer';

it('Renders Default InterestsItem', () => {
  const tree = renderer.create(<InterestsItem id="kgs://12hg3f" title="The Office" description="American Sitcom" />).toJSON();

  expect(tree).toMatchSnapshot();
});
