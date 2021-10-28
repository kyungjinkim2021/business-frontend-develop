import { createSlice, Draft } from '@reduxjs/toolkit';

type userType = {
  id: number | null;
  username: string | null;
};

const initialState = {
  id: 1,
  username: 'benja'
} as const;

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state: Draft<userType>, action) => {
      state.id = action.payload.id;
      state.username = action.payload.username;
    },
    resetUser: (state: Draft<userType>) => {
      state.id = null;
      state.username = null;
    }
  }
});

// Selectors
export const getUser = (state: any) => state.user;

// Reducers and actions
export const { setUser, resetUser } = userSlice.actions;

export default userSlice.reducer;
