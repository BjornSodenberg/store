import { configureStore } from '@reduxjs/toolkit';
import employeeReducer from './users/reducers';
import historyReducer from './history/reducers';

export const store = configureStore({
  reducer: {
    employees: employeeReducer,
    history: historyReducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
