import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'expo';

import Colors from '../constants/Colors';

/**
* Tab bar icon represnets a singular entry in the tab bar navigator
*/
export default class TabBarIcon extends React.Component {
  render() {
    return (
      <Icon.Ionicons
        name={this.props.name}
        size={26}
        style={{ marginBottom: -3 }}
        color={this.props.focused ? Colors.tabIconSelected : Colors.tabIconDefault}
      />
    );
  }
}

TabBarIcon.propTypes = {
  /**
  * Name of icon to render
  */
  name: PropTypes.string.isRequired,
  /**
  * Boolean indictating if tab icon is selected
  */
  focused: PropTypes.bool.isRequired,
}