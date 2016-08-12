import React, { Component } from 'react';

// Get a component's display name
const getDisplayName = WrappedComponent => {
  const component = WrappedComponent.WrappedComponent || WrappedComponent;
  return component.displayName || component.name || 'Component';
};

export default ({ theme }) => WrappedComponent => class ConfigDecorator extends Component {
  // Statics
  static displayName = `Config(${getDisplayName(WrappedComponent)})`;
  static WrappedComponent = WrappedComponent.WrappedComponent || WrappedComponent;

  // Default props
  static defaultProps = {
    draggable: true,
    readOnly: false,
  };

  state = {
    config: null
  }

  // Perform alignment
  config = () => {
    const { setEntityData } = this.props.blockProps;
    const data1 = window.prompt('Enter a data1'); // eslint-disable-line no-alert
    const data2 = window.prompt('Enter a data2'); // eslint-disable-line no-alert
    const data3 = window.prompt('Enter a data3'); // eslint-disable-line no-alert
    this.setState({config:{ data1,data2,data3 }});
    setEntityData({config:{ data1,data2,data3 }});
  };

  // Render
  render() {
    const { blockProps, className } = this.props;

    // Compose actions for the toolbar
    const actions = [
      {
        active: false,
        button: <span>cfg</span>,
        toggle: () => this.config(),
        label: 'config',
      },
    ];

    // Get the wrapped component and pass alignment props
    return (

      <WrappedComponent
        {...this.props}
        actions={this.props.actions?[this.props.actions,...actions]:actions}
      />
    );
  }
};