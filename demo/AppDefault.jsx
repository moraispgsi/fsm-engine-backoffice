/* eslint-disable no-alert */
import React from 'react';
// import tinycolor from 'tinycolor2';

class AppDefault extends React.Component {
  render() {
    return (
      this.props.children
    );
  }
}

AppDefault.propTypes = {
  children: React.PropTypes.node,
};

export default AppDefault;
