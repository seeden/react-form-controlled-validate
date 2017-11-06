import React from 'react';
import { mount } from 'enzyme';
import Form from 'react-form-controlled';
import Validator from './Validator';
import Alert from './Alert';

describe('Form', () => {
  it('should be able to create simple instance', (done) => {
    const value = {
      username: 'Zlatko',
    };

    const schema = {
      type: 'object',
      required: ['username', 'password'],
      properties: {
        username: {
          type: 'string',
          minLength: 2,
        },
        password: {
          type: 'string',
          minLength: 2,
        },
      },
    };

    let steps = 0;

    function onError(errors) {
      if (steps === 0) {
        expect(errors.length).toBe(1);
        expect(errors[0].path).toBe('password');
      }

      steps += 1;
    }

    function onSubmit(data) {
      expect(data.username).toBe('Zlatko');
      expect(data.password).toBe('test');
      expect(steps).toBe(2);
      done();
    }

    const wrapper = mount((
      <Validator schema={schema}>
        <Form
          value={value}
          onSubmit={onSubmit}
          onError={onError}
        >
          <input name="username" />
          <Alert name="password" />
          <input name="password" />
          <button type="submit">Submit</button>
        </Form>
      </Validator>
    ));

    expect(wrapper.find('form').length).toBe(1);
    wrapper.render().find('[type="submit"]').at(0).click();

    setTimeout(() => {
      const div = wrapper.render().find('div');
      expect(div.text()).toBe('should have required property \'password\'');
      steps++;
    }, 0);

    setTimeout(() => {
      expect(wrapper.find('input').length).toBe(2);
      wrapper.find('input').last().simulate('change', { target: {
        value: 'test',
      } });

      wrapper.render().find('[type="submit"]').at(0).click();
    }, 0);
  });
});
