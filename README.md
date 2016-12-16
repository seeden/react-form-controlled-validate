# React controlled form validate

Validation of the forms. High order components for react-form-controlled.
It is based on JSON Schema.


[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Test coverage][coveralls-image]][coveralls-url]

[npm-image]: https://img.shields.io/npm/v/react-form-controlled-validate.svg?style=flat-square
[npm-url]: https://www.npmjs.com/react-form-controlled-validate
[travis-image]: https://img.shields.io/travis/seeden/react-form-controlled-validate/master.svg?style=flat-square
[travis-url]: https://travis-ci.org/seeden/react-form-controlled-validate
[coveralls-image]: https://img.shields.io/coveralls/seeden/react-form-controlled-validate/master.svg?style=flat-square
[coveralls-url]: https://coveralls.io/r/seeden/react-form-controlled-validate?branch=master
[github-url]: https://github.com/seeden/react-form-controlled-validate


## Simple arrays

If you are using fieldset with simple array do not enter the name attribute.

```js
import React, { Component } from 'react';
import Form from 'react-form-controlled';
import Validate, { Alert } from 'react-form-controlled-validate';

const schema = {
  type: 'object',
  required: ['firstName'],
  firstName: {
    username: {
      type: 'string',
      minLength: 2,
    },
  },
};

export default class Example extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {};
  }

  onSubmit = (data) => {
    alert(`Hi ${data.firstName}`);
  }

  render() {
    return (
      <Validate schema={schema}>
        <Form
          value={this.state}
          onSubmit={this.onSubmit}
        >
          <input name="firstName" />
          <Alert name="firstName" />

          <button type="submit">Submit</button>
      </Form>
    );
  }
}
```

# Support us

Star this project on [GitHub][github-url].

## Try our other React components

 - Translate your great project [react-translate-maker](https://github.com/CherrySoftware/react-translate-maker)
 - Google Analytics [react-g-analytics](https://github.com/seeden/react-g-analytics)
 - Google AdSense via Google Publisher Tag [react-google-publisher-tag](https://github.com/seeden/react-google-publisher-tag)

## License

The MIT License (MIT)

Copyright (c) 2016 [Zlatko Fedor](http://github.com/seeden)
