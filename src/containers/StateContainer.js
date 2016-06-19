import State from '../components/State'
import { connect } from 'react-redux'

export default connect((state) => {return {state, clicked: state.clickReducer.click1}})(State)
