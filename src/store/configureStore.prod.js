import { createStore } from 'redux';
import rootReducer from 'src/reducers';

export default function configureStore(initialState) {
  return createStore(rootReducer, initialState);
}
