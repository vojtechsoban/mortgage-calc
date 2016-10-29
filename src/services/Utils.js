import React, { Component } from 'react';

export const renderInput = field => {  // Define stateless component to render input and errors
 return (<div>
        <input {...field.input} type={field.type} />
        {field.meta.touched &&
         field.meta.error &&
         <span className="error">{field.meta.error}</span>}
    </div>);
};
