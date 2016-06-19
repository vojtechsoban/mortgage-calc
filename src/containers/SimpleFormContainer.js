import { reduxForm } from 'redux-form'
import { SimpleForm, fields } from '../components/SimpleForm'
import { LoadAction } from '../actions/ClickActions'

const mapStateToProps = (state) => {return {
    // TODO add initial values to state and extract these values from the state
    initialValues: {firstName: 'initial first', lastName: 'initial last'}
}
};

export default reduxForm({
                             form: 'simple',
                             fields
                         },
                         mapStateToProps,
                         { load: LoadAction }      // mapDispatchToProps (will bind action creator to dispatch)
)(SimpleForm)
