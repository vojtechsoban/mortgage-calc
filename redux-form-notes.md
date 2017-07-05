
Redux form notes
================

Fill form with existing data
--------


`
      // TODO see ExtraPaymentInputForm - use redux-form action creator: initialize(form:String, data:Object, keepDirty:boolean)
      const extraPaymentToEdit = state.extraPayments.find(extraPayment => extraPayment.paymentIndex === action.paymentIndex);
      result.initialValues.extraPayments = extraPaymentToEdit;
`
