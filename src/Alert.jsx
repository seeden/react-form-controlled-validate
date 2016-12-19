import React, { PropTypes } from 'react';
import { Element } from 'react-form-controlled';

export default class Alert extends Element {
  static propTypes = {
    name: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    exact: PropTypes.bool,
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
    render: PropTypes.func,
    component: PropTypes.node,
    className: PropTypes.string,
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
    const { className, children, render, component: Component, exact, ...rest } = this.props;
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
    } else if (Component) {
      return <Component errors={errors} {...rest} />;
    } else if (children) {
      return children;
    }

    return (
      <div role="alert" className={className}>
        {errors.map(error => error.message)}
      </div>
    );
  }
}
