import React, {Component} from 'react';
import Layout from './Layout';
import MortgageInputFormContainer from './containers/MortgageInputFormContainer';
import ExtraPaymentInputFormContainer from './containers/ExtraPaymentInputFormContainer';
import ExtraPaymentsContainer from './containers/ExtraPaymentsContainer';
import MortgageResultFormContainer from './containers/MortgageResultContainer';

// If you use React Router, make this component
// render <Router> with your routes. Currently,
// only synchronous routes are hot reloaded, and
// you will see a warning from <Router> on every reload.
// You can ignore this warning. For details, see:
// https://github.com/reactjs/react-router/issues/2182

export default class App extends Component {
    render() {
        return (
            <Layout>
                <MortgageInputFormContainer  />
                <ExtraPaymentInputFormContainer />
                <ExtraPaymentsContainer />
                <MortgageResultFormContainer />
            </Layout>
        );
    }
}
