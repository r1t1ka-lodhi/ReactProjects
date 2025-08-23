import {configureStore} from '@reduxjs/toolkit';
import authSlice from './authSlice';
const store = configureStore({
    reducer: {
        auth : authSlice,
        // your reducers go here
    }
});
export default store;