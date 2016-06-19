import State from '../components/State'
import { connect } from 'react-redux'

export default connect((state) => {
    const firstName = state.form.simple ? state.form.simple.firstName.value : undefined;
    return {
        state,
        clicked: state.clickReducer.click1,
        firstName
    }})(State)
