import React, { Component } from 'react';
import {FormControl} from 'react-bootstrap';

export const renderInput = field => {  // Define stateless component to render input and errors
 return (<FormControl {...field.input} type={field.type}>
    </FormControl>);
};
