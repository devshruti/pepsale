import { configureStore } from '@reduxjs/toolkit';
import swimlaneReducer from '../slices/swimlaneSlice';

export const store = configureStore({
  reducer: {
    swimlane: swimlaneReducer
  }
});
