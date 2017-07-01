import React, {Component, PropTypes} from 'react';
import {FormGroup, ControlLabel, Button, Grid, Row, Col} from 'react-bootstrap';
import DateTimeField from 'react-bootstrap-datetimepicker';
import {connect} from 'react-redux';
import {reduxForm, Field} from 'redux-form'
import {renderInput, renderDateTime} from '../services/Utils';

class MortgageInputForm extends Component {
  
  render() {
    
    const {handleSubmit} = this.props;
    
    return (<form onSubmit={handleSubmit}>
        <Grid>
          <Row>
            <Col xs={8} md={4}>
              <FormGroup>
                <ControlLabel>Principal</ControlLabel>
                <Field name="principal" component={renderInput} type="text" className="form-control"/>
              </FormGroup>
            </Col>
            <Col xs={8} md={4}>
              <FormGroup>
                <label>Rate</label>
                <Field name="rate" component={renderInput} type="text" className="form-control"/>
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col xs={8} md={4}>
              <FormGroup>
                <ControlLabel>Monthly payment</ControlLabel>
                <Field name="monthlyPayment" component={renderInput} type="text" className="form-control"/>
              </FormGroup>
            </Col>
            <Col xs={8} md={4}>
              <FormGroup>
                <ControlLabel>Mortgage start</ControlLabel>
                <Field name='start' component={renderDateTime} type="text" className="form-control"/>
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col xs={8} xsOffset={8} md={4}>
              <FormGroup>
                <Button type="submit">Calculate</Button>
              </FormGroup>
            </Col>
          </Row>
        </Grid>
      </form>
    )
  }
}

MortgageInputForm.propTypes = {
  onSubmit: PropTypes.func.isRequired
};

let decoratedForm = reduxForm({
    form: 'mortgageInputForm'
  }
)(MortgageInputForm);

decoratedForm = connect(state => ({
    initialValues: state.calculateMortgageReducer.initialValues.mortgage
  }),
  null,
  null,
  {withRef: true}
)(decoratedForm);

export default decoratedForm;
