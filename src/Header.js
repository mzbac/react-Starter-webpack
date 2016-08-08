/**
 * Created by anchenli on 8/08/16.
 */
import React, { PropTypes } from 'react';
import { AppBar } from 'react-toolbox';

export const Header = props => {
  const {} = props;

  return (
    <AppBar fixed flat>
      <a href="#/home">Editor</a>
    </AppBar>
  );
}

Header.propTypes = {
  
};

export default Header;
