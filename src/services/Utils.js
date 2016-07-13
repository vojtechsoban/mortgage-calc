import _ from 'lodash'

// redux-form properties for which React raises warning
const excludeProperties = [ 'initialValue', 'autofill', 'onUpdate', 'valid', 'invalid', 'dirty', 'pristine', 'active',
                            'touched', 'visited', 'autofilled' ];

export const filterProps = (props) => {
    return _.omit(props, excludeProperties);
};

