export const ClickAction = (id = -1) => {
    return {
        type: 'CLICK',
        id
    }
}

// TODO use LoadAction
export const LoadAction = (data = {}) => {
  return {
      type: 'LOAD',
      data
  }  
};