import { combineReducers } from 'redux';
import listingReducer from './reducer/listingReducer';

const rootReducer = combineReducers({
  listing: listingReducer
});

export default rootReducer;
