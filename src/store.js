import { createStore } from 'redux';

const initialState = {
  connection: null,
  connectionId: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_CONNECTION':
      return { ...state, connection: action.payload };
      case 'SET_CONNECTIONID':
        return { ...state, connectionId: action.payload };
      default:
        return state;
  }
};

const store = createStore (reducer);

export default store;