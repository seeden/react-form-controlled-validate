import React, { PropTypes } from 'react';
import { Element } from 'react-form-controlled';

export default class Alert extends Element {
  static propTypes = {
    name: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    exact: PropTypes.bool,
    children: PropTypes.func,
    render: PropTypes.func,
    component: PropTypes.node,
  };

  componentDidMount() {
    const form = this.getForm();
    form.registerChild(this);
  }

  componentWillUnmount() {
    const form = this.getForm();
    form.unregisterChild(this);
  }

  originalValueChanged() {
    this.forceUpdate();
  }

  render() {
    const { children, render, component: Component, exact, ...rest } = this.props;
    const path = this.getPath();
    const form = this.getForm();

    const errors = form.getErrors(path, exact);
    if (!errors || !errors.length) {
      return null;
    }

    if (typeof children === 'function') {
      return this.replaceChildren(children({ errors }));
    } else if (typeof render === 'function') {
      return this.replaceChildren(render({ errors }));
    }

    if (!Component) {
      if (children) {
        return children;
      }

      return (
        <div role="alert">
          {errors.map(error => error.message)}
        </div>
      );
    }

    return <Component errors={errors} {...rest} />;
  }
}
