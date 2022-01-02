import { configureStore } from '@reduxjs/toolkit'
import ListCommentReducer from '../slice/DataSlice';

export const store = configureStore({
  reducer: {
	ListCommentReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch