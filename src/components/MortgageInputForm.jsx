import React, { Component, PropTypes } from 'react'

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
                        <input type="text" placeholder="Principal" {...principal} />
                    </div>
                </div>
                <div>
                    <label>Rate</label>
                    <div>
                        <input type="text" placeholder="Rate" {...rate} />
                    </div>
                </div>
                <div>
                    <label>Monthly payment</label>
                    <div>
                        <input type="text" placeholder="Monthly payment" {...monthlyPayment}/>
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

