import { configureStore } from "@reduxjs/toolkit";

import chatbots from "./reducers/chatbots";
import saved from "./reducers/saved";
import users from "./reducers/users";
import plans from "./reducers/plans";
import chat from "./reducers/chat";
import documents from "./reducers/documents";

export const store = configureStore({
  reducer: {
    chatbots,
    saved,
    users,
    plans,
    chat,
    documents,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
