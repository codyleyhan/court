import React from 'react';
import { Text } from 'react-native';

export class RegularText extends React.Component {
  render() {
    return <Text {...this.props} style={[this.props.style, { fontFamily: 'orkney-regular' }]} />;
  }
}

export class MediumText extends React.Component {
  render() {
    return <Text {...this.props} style={[this.props.style, { fontFamily: 'orkney-medium' }]} />;
  }
}

export class BoldText extends React.Component {
  render() {
    return <Text {...this.props} style={[this.props.style, { fontFamily: 'orkney-bold' }]} />;
  }
}

export class LightText extends React.Component {
  render() {
    return <Text {...this.props} style={[this.props.style, { fontFamily: 'orkney-light' }]} />;
  }
}
