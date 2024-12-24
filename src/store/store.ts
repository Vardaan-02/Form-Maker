import { configureStore } from "@reduxjs/toolkit";
import sidebarReducer from "@/store/slices/sidebar-slice";
import borderSlice from "./slices/border-slice";

export const store = configureStore({
  reducer: {
    sidebar: sidebarReducer,
    border: borderSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
