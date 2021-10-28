import {
  configureStore,
  ThunkAction,
  Action,
  combineReducers
} from '@reduxjs/toolkit';
import { createWrapper, HYDRATE } from 'next-redux-wrapper';

import { joinSlice, themeSlice, userSlice, loginSlice } from './slices';

export const reducer = (state: any, action: any) => {
  if (action.type === HYDRATE) {
    return {
      ...state,
      ...action.payload
    };
  }
  return combineReducers({
    loginSlice
  })(state, action);
};

export const makeStore = () =>
  configureStore({
    reducer: {
      userStore: userSlice,
      themeStore: themeSlice,
      joinStore: joinSlice,
      loginStore: loginSlice
    },
    devTools: process.env.NODE_ENV !== 'production',
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: []
        }
      })
  });

export const store = makeStore();
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
export const wrapper = createWrapper(makeStore, {
  // debug: process.env.NODE_ENV !== "production",
});
