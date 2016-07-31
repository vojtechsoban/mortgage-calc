import React, { Component, PropTypes } from 'react';
import { filterProps } from '../services/Utils';
export const fields = [ 'paymentIndex', 'amount' ];

export class ExtraPaymentInputForm extends Component {
    render() {
        const {
            fields: { paymentIndex, amount },
            handleSubmit
        } = this.props;
        
        return (<form onSubmit={handleSubmit}>
                <div>
                    <label>Payment index</label>
                    <div>
                        <input type="text" placeholder="Payment index" {...filterProps(paymentIndex)} />
                    </div>
                </div>
                <div>
                    <label>Amount</label>
                    <div>
                        <input type="text" placeholder="Amount $ or %" {...filterProps(amount)} />
                    </div>
                </div>
                <div>
                    <button type="submit">
                        Submit
                    </button>
                </div>
            </form>
        )
    }
}

ExtraPaymentInputForm.propTypes = {
    fields: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired
};

