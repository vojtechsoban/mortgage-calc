import React from 'react';

export default (installments) => {
    return (<table>
        <thead>
        <tr>
            <th>index</th>
            <th>monthly payment</th>
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
                    <td>{item.payment}</td>
                    <td>{item.principalPart.toFixed(0)}</td>
                    <td>{item.installmentPart.toFixed(0)}</td>
                    <td>{item.type}</td>
                </tr>
            );
        })}
        </tbody>
    </table>);
};
