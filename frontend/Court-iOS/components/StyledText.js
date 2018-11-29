import React from 'react';
import { Text } from 'react-native';
import PropTypes from 'prop-types';

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

RegularText.propTypes = {
  /**
  * Specifies render style for text
  */
  style: PropTypes.object,
};

MediumText.propTypes = {
  /**
  * Specifies render style for text
  */
  style: PropTypes.object,
};

BoldText.propTypes = {
  /**
  * Specifies render style for text
  */
  style: PropTypes.object,
};

LightText.propTypes = {
  /**
  * Specifies render style for text
  */
  style: PropTypes.object,
};
