export default function counter(state = 0, action) {
  console.log(`counter state=${state}, action.type=${action.type}`)
  switch (action.type) {
    case 'INCREMENT':
      return state + 1
    case 'DECREMENT':
      return state - 1
    default:
      return state
  }
}
