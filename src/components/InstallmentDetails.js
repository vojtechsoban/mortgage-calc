import React from 'react';

export default (installments) => {
    return (<table>
        <tbody>
        {installments.map((item, id) => {
            return (
                <tr key={id}>
                    <td>{item.count}</td>
                    <td>{item.payment}</td>
                    <td>{item.principalPart.toFixed(0)}</td>
                    <td>{item.installmentPart.toFixed(0)}</td>
                </tr>
            );
        })}
        </tbody>
    </table>);
};
