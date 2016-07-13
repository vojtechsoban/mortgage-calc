import React, {Component} from 'react';

export default class MortgageResult extends Component {
    render() {

        if (!this.props.mortgage) {
            return null;
        }

        const {installmentCount, installmentSum} = this.props.mortgage;

        return (
            <div>
                <table>
                    <tbody>
                    <tr>
                        <td>Installment count</td>
                        <td>{installmentCount}</td>
                    </tr>
                    <tr>
                        <td>Installment sum</td>
                        <td>{installmentSum.toFixed(0)}</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        )
    }
}
