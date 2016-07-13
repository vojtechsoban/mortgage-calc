export const ClickAction = (id = -1) => {
    return {
        type: 'CLICK',
        id
    }
};

export const CalculateMortgageAction = (formData = {}) => {
    return {
        type: 'CALCULATE_MORTGAGE',
        formData
    }
};

// TODO use LoadAction
export const LoadAction = (data = {}) => {
  return {
      type: 'LOAD',
      data
  }  
};
