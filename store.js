import { combineReducers } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import { createStore, applyMiddleware } from 'redux';
import storage from 'redux-persist/lib/storage';
import { createLogger } from 'redux-logger';
import listingReducer from './reducer/listingReducer';

const persistConfig = {
  key: 'root',
  storage: storage
  // blacklist: ['listing']
};

const rootReducer = combineReducers({
  listing: listingReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(persistedReducer, applyMiddleware(createLogger()));
let persistor = persistStore(store);
export { store, persistor };
