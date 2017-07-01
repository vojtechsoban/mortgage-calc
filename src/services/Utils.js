import React, { Component } from 'react';
import {FormControl, Radio, Tooltip} from 'react-bootstrap';

export const renderInput = field => {
 return (<FormControl {...field.input} type={field.type} title={field.title}>
 </FormControl>);
};

export const renderRadio = (text) => (field => (<Radio inline {...field.input}>{text}</Radio>));
