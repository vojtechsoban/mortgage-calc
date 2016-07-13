import React, {Component} from 'react';

export default class MortgageResult extends Component {
    render() {

        const {installmentCount, installmentSum} = this.props.mortgage;
        console.log('MortgageResult.props', this.props);

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
                        <td>{installmentSum}</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        )
    }
}
