import { configureStore, combineReducers, getDefaultMiddleware } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { watcherSaga } from './sagas/rootSaga';
import userReducer from './slices/user.slice';
import snackbarReducer from './slices/snackbar.slice';
import backdropReducer from './slices/backdrop.slice';
// Currently, we did not use saga, we did not touch any from open source.
const sagaMiddleware = createSagaMiddleware();

const reducer = combineReducers({
    user: userReducer,
    snackbar: snackbarReducer,
    backdrop: backdropReducer,
});

const store = configureStore({
    reducer,
    middleware: [...getDefaultMiddleware({ thunk: false }), sagaMiddleware],
});
sagaMiddleware.run(watcherSaga);

export default store;

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
