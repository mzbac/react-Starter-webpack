import React, { Component, PropTypes } from 'react';
import Header from './Header';
import Aside from './Aside';
import  KeyPathEditor from './KeyPathEditor';

class App extends Component {

  render() {
    return (
      <div >
        <Header />
        <Aside />
        <KeyPathEditor />
      </div>
    );
  }
}
App.propTypes = {};
export default App