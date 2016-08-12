import React, { Component, PropTypes } from 'react';
import { Card, CardMedia, CardTitle, CardText, CardActions } from 'react-toolbox/lib/card';
import { Button, IconButton } from 'react-toolbox/lib/button';


class TestComponent extends Component {
  render() {
    const { blockProps } = this.props;
    if (blockProps.pluginEditor.getReadOnly()) {
      return (
        <div>readOnlyView</div>
      );
    }

    return (
      <div
        style={{
          backgroundColor: '#DDDDDD',
          display: 'flex',
          justifyContent: 'center',
          boxShadow: blockProps.isFocused ? '0 0 5px rgba(81, 203, 238, 1)' : '',
          border: blockProps.isFocused ? '1px solid rgba(81, 203, 238, 1)' : '',
        }}
        contentEditable={false}
      >
        <div style={{ margin: '0 auto' }}>
          {blockProps.entityData.config.data1 ? blockProps.entityData.config.data1 : 'please config left part'}
        </div>
        <div style={{ margin: '0 auto' }}>
          {blockProps.entityData.config.data2 ? blockProps.entityData.config.data2 : 'please config right part'}
        </div>
      </div>
    );
  }
}
TestComponent.propTypes = {};

export default TestComponent;

