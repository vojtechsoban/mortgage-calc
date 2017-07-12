import React from 'react';
import {FormControl, Radio} from 'react-bootstrap';
import DateTimeField from 'react-bootstrap-datetimepicker';

export const renderDateTime = field => (
  <DateTimeField
    dateTime={field.input.value}
    mode='date' inputFormat='D.M.YYYY'
    {...field.input}
    type={field.type}
    title={field.title}/>
);

export const renderInput = field => {
  return (<FormControl {...field.input} type={field.type} title={field.title}>
  </FormControl>);
};

/* eslint-disable react/display-name */
export const renderRadio = text => field => (
  <Radio inline {...field.input}>{text}</Radio>
);
