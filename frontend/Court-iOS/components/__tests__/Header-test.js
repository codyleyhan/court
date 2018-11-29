import 'react-native';
import React from 'react';
import Colors from '../../constants/Colors';
import Header from '../Header';
import renderer from 'react-test-renderer';

it('Renders Default Header', () => {
  const tree = renderer.create(<Header text="Test Header"/>).toJSON();

  expect(tree).toMatchSnapshot();
});

it('Renders Header w/ Custom Color', () => {
  const tree = renderer.create(<Header text="Test Header" color={Colors.merlot}/>).toJSON();

  expect(tree).toMatchSnapshot();
});
