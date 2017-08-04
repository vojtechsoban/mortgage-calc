import PropTypes from 'prop-types';
import React from 'react';
import DateTime from 'react-datetime';
import { Input, Radio } from 'semantic-ui-react';

export const renderDateTime = field => {
  console.log('renderDateTime', field);
  // TODO customize appearance, add open calendar buton, edit date as text
  // https://github.com/YouCanBookMe/react-datetime#customize-the-input-appearance
  return (
    <DateTime
      value={field.input.value}
      dateFormat="D.M.YYYY"
      timeFormat={false}
      className="ui input"
      closeOnSelect={true}
      onChange={field.input.onChange}
    />
  );
};

export const renderInput = field => {
  return (
    <Input
      {...field.input}
      type={field.type}
      title={field.title}
    />
  );
};

/* eslint-disable react/display-name */
export const renderRadio = text => field => (
  <Radio {...field.input} type={field.type} label={text}/>
);

export const SemanticReduxFormField = ({input, label, meta: {touched, error, warning}, as: As, ...props}) => {

  function handleChange(ignore, {value}) {
    return input.onChange(value);
  }

  return (
    <span>
      <As {...input} label={label} value={input.value} {...props} onChange={handleChange} error={touched && error}/>
      {touched && (warning && <span>{warning}</span>)}
    </span>
  );
};

SemanticReduxFormField.propTypes = {
  as: PropTypes.any,
  input: PropTypes.any,
  label: PropTypes.any,
  meta: PropTypes.any
};
