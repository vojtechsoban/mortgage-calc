import Button from '../components/Button'
import { ClickAction } from '../actions/ClickActions'
import { connect } from 'react-redux'

const mapStateToProps = (state) => {
    console.log('loguju state v button', state)
    return {clicked: state.click1}
}

const mapDispatchToProps = (dispatch) => {
    return {
        onClick: (args) => {
            dispatch(ClickAction(args))
        }
    }
}

const ButtonContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Button)

export default ButtonContainer