import { Component, cloneElement } from 'react';
import PropTypes from 'prop-types';
import Ajv from 'ajv';

function errorToProperty(err) {
  const { params = {} } = err;

  if (params.missingProperty) {
    return params.missingProperty;
  }

  return undefined;
}

export default class Validator extends Component {
  static propTypes = {
    schema: PropTypes.object,
    children: PropTypes.node,
  };

  constructor(props, context) {
    super(props, context);

    this.state = {
      ...this.getStateFromProps(props),
    };
  }

  componentWillReceiveProps(props) {
    this.setState(this.getStateFromProps(props));
  }

  getStateFromProps(props) {
    const { schema } = props;
    if (!schema) {
      return {
        validator: null,
      };
    }

    const currentValidator = this.state && this.state.validator;
    if (!currentValidator || currentValidator.schema !== schema) {
      const ajv = this.ajv = this.ajv || Ajv({
        allErrors: true,
      });

      const validator = ajv.compile(schema);

      validator.schema = schema;

      return {
        validator,
      };
    }

    return {};
  }

  validate = async (value) => {
    const { validator } = this.state;
    if (!validator) {
      return [];
    }

    const valid = validator(value);
    if (valid) {
      return [];
    }

    const { errors } = validator;

    return errors.map((err) => {
      const prop = errorToProperty(err);
      const path = err.dataPath ? err.dataPath.substr(1) : null;

      const fullPath = path && prop
        ? `${path}.${prop}`
        : path || prop;

      return {
        ...err,
        path: fullPath,
      };
    });
  }

  render() {
    const { children } = this.props;
    if (!children) {
      return children;
    }

    return cloneElement(children, {
      validate: this.validate,
    });
  }
}
