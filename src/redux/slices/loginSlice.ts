import { createSlice } from '@reduxjs/toolkit';

type StateType = {};

const initialState: StateType = {};

export const loginSlice = createSlice({
  name: 'member/login',
  initialState,
  reducers: {}
});

export default loginSlice.reducer;
