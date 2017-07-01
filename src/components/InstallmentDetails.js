import React from 'react';
import {Table} from 'react-bootstrap';

export default (installments) => {
    return (<Table striped bordered condensed hover>
        <thead>
        <tr>
            <th>index</th>
            <th>monthly payment</th>
            <th>rate</th>
            <th>principal</th>
            <th>installment</th>
            <th>type</th>
        </tr>
        </thead>
        <tbody>
        {installments.map((item, id) => {
            return (
                <tr key={id}>
                    <td>{item.count}</td>
                    <td>{item.payment ? item.payment.toFixed(0) : null}</td>
                    <td>{item.rate ? (item.rate * 100).toFixed(2) : null}</td>
                    <td>{item.principalPart ? item.principalPart.toFixed(0) : null}</td>
                    <td>{item.installmentPart ? item.installmentPart.toFixed(0) : null}</td>
                    <td>{item.type}</td>
                </tr>
            );
        })}
        </tbody>
    </Table>);
};
