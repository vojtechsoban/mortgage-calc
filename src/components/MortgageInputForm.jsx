import React, { Component, PropTypes } from 'react';
import { filterProps } from '../services/Utils';
export const fields = [ 'principal', 'rate', 'monthlyPayment' ];

export class MortgageInputForm extends Component {
    render() {
        const {
            fields: { principal, rate, monthlyPayment },
            handleSubmit
        } = this.props;
        
        return (<form onSubmit={handleSubmit}>
                <div>
                    <label>Principal</label>
                    <div>
                        <input type="text" placeholder="Principal" {...filterProps(principal)} />
                    </div>
                </div>
                <div>
                    <label>Rate</label>
                    <div>
                        <input type="text" placeholder="Rate" {...filterProps(rate)} />
                    </div>
                </div>
                <div>
                    <label>Monthly payment</label>
                    <div>
                        <input type="text" placeholder="Monthly payment" {...filterProps(monthlyPayment)}/>
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

MortgageInputForm.propTypes = {
    fields: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired
}

