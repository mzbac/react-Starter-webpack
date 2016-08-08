import React, {Component, PropTypes} from 'react';
import Header from './Header';
import Aside from './Aside';
import  Editor from './Editor';

class App extends Component {

  render() {
    return (
      <div>
        <Header />
        <Aside />
        <Editor />
      </div>
    );
  }
}
App.propTypes = {};
export default App