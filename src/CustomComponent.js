import React, { Component, PropTypes } from 'react';
import { Card, CardMedia, CardTitle, CardText, CardActions } from 'react-toolbox/lib/card';
import { Button, IconButton } from 'react-toolbox/lib/button';


class TestComponent extends Component {
  constructor() {
    super();
    this.state = { name: '', phone: '', email: '', hint: '' };
  }

  handleChange = (name, value) => {
    this.setState({ ...this.state, [name]: value });
  }


  render() {
    const { blockProps } = this.props;
    if (blockProps.pluginEditor.getReadOnly()) {
      return (
        <div>readOnlyView</div>
      );
    }


    return (
      <section>
        <Button label="config" onClick={ () => console.log('clicked')}/>
      </section>);
  }
}
TestComponent.propTypes = {};
export default TestComponent;

