import * as React from 'react';
import {
  Platform,
  StatusBar,
  StyleSheet,
  View,
  AsyncStorage
} from 'react-native';
import logger from 'redux-logger';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import reducer from './store';
import Main from './index';

const store = configureStore({
  reducer: reducer,
  middleware: [logger]
});

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Main />
      </Provider>
    );
  }
}
