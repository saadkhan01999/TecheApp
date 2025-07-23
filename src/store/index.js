import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import coursesReducer from './slices/coursesSlice';
import uiReducer from './slices/uiSlice';
import notificationsReducer from './slices/notificationsSlice';
import meetingsReducer from './slices/meetingsSlice';
import storyBooksReducer from './slices/storyBooksSlice';
import tasksReducer from './slices/tasksSlice';
import achievementsReducer from './slices/achievementsSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    courses: coursesReducer,
    ui: uiReducer,
    notifications: notificationsReducer,
    meetings: meetingsReducer,
    storyBooks: storyBooksReducer,
    tasks: tasksReducer,
    achievements: achievementsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
});