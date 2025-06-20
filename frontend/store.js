
import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './src/saga'; 
const sagaMiddleware = createSagaMiddleware();
import userReducer from './src/feature/userSlice';
import userListReducer from './src/feature/userlistSlice';
import dashboardReducer from './src/feature/dashboardSlice';

const store = configureStore({
  reducer: {
    userData: userReducer,
    usersList: userListReducer,
    dashboardList: dashboardReducer, 
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware), 
  
});

sagaMiddleware.run(rootSaga);

export default store;