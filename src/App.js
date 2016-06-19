import React, {Component} from 'react';
import Layout from './Layout';
import Button from './components/Button';
import StateContainer from './containers/StateContainer';
import ButtonContainer from './containers/ButtonContainer'
import SimleFormContainer from './containers/SimpleFormContainer'

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
                <StateContainer />
                <br />
                {/* TODO bind submit to some action */}
                <SimleFormContainer onSubmit={(data, dispatch) => console.log(`submit form: data.firstName=${data.firstName}`)} />
                <br />
                <Button text="dummy button with vanilla onClick" onClick={() => console.log('vanilla onClick')} />
                {" "}
                <ButtonContainer text="other button"/>
            </Layout>
        );
    }
}
