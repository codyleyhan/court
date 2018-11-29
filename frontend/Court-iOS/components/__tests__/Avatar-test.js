import 'react-native';
import React from 'react';
import Avatar from '../Avatar';
import Colors from '../../constants/Colors';
import renderer from 'react-test-renderer';

it('Renders Default Avatar', () => {
  const tree = renderer.create(<Avatar width={200}/>).toJSON();

  expect(tree).toMatchSnapshot();
});

it('Renders Default PNG w/o src', () => {
  const tree = renderer.create(<Avatar width={200} imgURL={null}/>).toJSON();

  expect(tree).toMatchSnapshot();
});

it('Renders Profile Picture', () => {
  const tree = renderer.create(<Avatar width={200} imgURL={"https://heightline.com/wp-content/uploads/Justin-Roberts-640x427.jpg"}/>).toJSON();

  expect(tree).toMatchSnapshot();
});

it('Renders Icon Image', () => {
  const tree = renderer.create(<Avatar width={200} imgURL={null} animalName={"sloth"} color={Colors.merlot}/>).toJSON();

  expect(tree).toMatchSnapshot();
});

it('Renders Nested Avatar', () => {
  const tree = renderer.create(<Avatar width={200} imgURL={"https://heightline.com/wp-content/uploads/Justin-Roberts-640x427.jpg"} animalName={"sloth"} color={Colors.merlot}/>).toJSON();

  expect(tree).toMatchSnapshot();
});