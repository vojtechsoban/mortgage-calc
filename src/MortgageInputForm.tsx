import React, { Component } from 'react'
import { Button, Form } from 'semantic-ui-react'
import { Formik } from 'formik'
import SemanticDatepicker from 'react-semantic-ui-datepickers'
import spected from 'spected'

const initialValues = {
  principal: 2000000,
  rate: 3.79,
  monthlyPayment: 13000,
  mortgageStart: new Date(),
}

function calculateMortgage(values, actions) {
  console.log('calculateMortgage', values)
  actions.setSubmitting(false)
  // actions.setSubmitting(false)
  // actions.setErrors(transformMyRestApiErrorsToAnObject(error))
  // actions.setStatus({ msg: 'Set some arbitrary status or data' })
}

const positiveNumber = [value => value > 0, 'Must be positive']

const validationRules = {
  principal: [positiveNumber],
  rate: [positiveNumber],
  monthlyPayment: [positiveNumber],
}

// type SpectedResult = {
//   string: string[] | boolean,
// }

function validate(values) {
  const spectedResult = spected(validationRules, values)
  return Object.entries(spectedResult)
    .filter(([value, result]) => result !== true)
    // @ts-ignore
    .map(([value, errors]) => [value, errors.join(', ')])
    .reduce((acc, [value, error]) => ({ ...acc, [value]: error }), {})
}

class MortgageInputForm extends Component {

  render() {
    return (
      <div>
        <Formik
          initialValues={initialValues}
          onSubmit={calculateMortgage}
          validate={validate}
          render={({
            values,
            errors,
            status,
            touched,
            handleBlur,
            handleChange,
            handleSubmit,
            isSubmitting,
            setFieldValue,
          }) => (

            <Form onSubmit={handleSubmit}>
              <Form.Group widths="equal">
                <Form.Field>
                  <label>Principal</label>
                  <input
                    type="number"
                    name="principal"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.principal}
                  />
                  {errors.principal && touched.principal && <div>{errors.principal}</div>}
                </Form.Field>
                <Form.Field>
                  <label>Rate</label>
                  <input
                    type="number"
                    name="rate"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.rate}
                  />
                  {errors.rate && touched.rate && <div>{errors.rate}</div>}
                </Form.Field>
              </Form.Group>

              <Form.Group widths="equal">
                <Form.Field>
                  <label>Monthly payment</label>
                  <input
                    type="number"
                    name="monthlyPayment"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.monthlyPayment}
                  />
                  {errors.monthlyPayment && touched.monthlyPayment && <div>{errors.monthlyPayment}</div>}
                </Form.Field>
                <Form.Field>
                  <label>Mortgage start</label>
                  <SemanticDatepicker
                    onDateChange={(date) => {
                      setFieldValue('mortgageStart', date)
                    }}
                    type="basic"
                    selected={values.mortgageStart}
                    clearable={false}
                    format="D.M.YYYY"
                  />

                  {errors.mortgageStart && touched.mortgageStart && <div>{errors.mortgageStart}</div>}
                </Form.Field>
              </Form.Group>
              <Button primary type="submit">Calculate</Button>
            </Form>
          )}
        />
      </div>
    )
  }
}

export default MortgageInputForm
