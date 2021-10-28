import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  ApiResult,
  checkIdDup,
  CheckIdDupType,
  JoinType,
  joinUser
} from '@Controller/member/join/Join.Controller';

export interface UserInfoType {
  userName: string | null;
  birthYearMonth: string | null;
  sex: string;
  userPhone1: string | null;
  userPhone2: string | null;
  userPhone3: string | null;
  userPhoneIsValid: boolean;
  authCode: string | null;
  authCodeIsChecked: boolean;
  userId: string | null;
  userPass: string | null;
  userPassRe: string | null;
  zipcode: string | null;
  address: string | null;
  addressDetail: string | null;
  businessNumber1?: string | null;
  businessNumber2?: string | null;
  businessNumber3?: string | null;
  companyName?: string | null;
  companyPhone1?: string | null;
  companyPhone2?: string | null;
  companyPhone3?: string | null;
  companyDirectPhone1?: string | null;
  companyDirectPhone2?: string | null;
  companyDirectPhone3?: string | null;
}

interface InitialStateProps {
  joinType: string | null;
  joinStep: number;
  termsAgree: boolean;
  joinAgent?: boolean;
  userInfo: UserInfoType | null;
  errMessage: string | null;
  joinUserAsyncResult?: ApiResult;
}
export const testJoinData: InitialStateProps = {
  joinType: 'general',
  joinStep: 3,
  termsAgree: true,
  joinAgent: false,
  userInfo: {
    userName: '김성문',
    birthYearMonth: '19750214',
    sex: 'male',
    userPhone1: '010',
    userPhone2: '1111',
    userPhone3: '22222',
    userPhoneIsValid: true,
    authCode: '1234',
    authCodeIsChecked: true,
    userId: 'smkim',
    userPass: 'smkim123!',
    userPassRe: 'smkim123!',
    zipcode: null,
    address: null,
    addressDetail: null
  },
  errMessage: null
};
const initialState: InitialStateProps = {
  joinType: null,
  joinStep: 0,
  termsAgree: false,
  joinAgent: false,
  userInfo: {
    userName: null,
    birthYearMonth: null,
    sex: 'male',
    userPhone1: '010',
    userPhone2: null,
    userPhone3: null,
    userPhoneIsValid: false,
    authCode: null,
    authCodeIsChecked: false,
    userId: null,
    userPass: null,
    userPassRe: null,
    zipcode: null,
    address: null,
    addressDetail: null
  },
  errMessage: null
};

export const joinUserAsync = createAsyncThunk(
  'join/joinUser',
  async (joinParam: JoinType) => {
    const response = await joinUser(joinParam);
    return response.data;
  }
);
export const checkIDupAsync = createAsyncThunk(
  'join/checkIdDup',
  async (req: CheckIdDupType) => {
    const response = await checkIdDup(req);
    return response.data;
  }
);

export const joinSlice = createSlice({
  name: 'member/join',
  initialState,
  reducers: {
    clear: (state, { payload }) => {
      const { initData } = payload;
      Object.assign(state, initData || initialState);
    },
    updateJoinStep: (state, { payload }) => {
      state.joinStep = payload;
    },
    updateJoinType: (state, { payload }) => {
      state.joinType = payload;
    },
    updateJoinAgent: (state, { payload }) => {
      state.joinAgent = payload;
    },
    resetTermAgree: (state) => {
      state.termsAgree = false;
    },
    updateTermsAgree: (state, { payload }) => {
      const { termsAgree } = payload;
      state.termsAgree = termsAgree;
    },
    resetUserInfo: (state) => {
      state.userInfo = initialState.userInfo;
    },
    updateUserInfo: (state, { payload }) => {
      const { userInfo } = payload;
      state.userInfo = {
        ...state.userInfo,
        ...userInfo
      };
    }
  },
  extraReducers: {
    [joinUserAsync.fulfilled.toString()]: (_state, { payload }) => {
      console.log('joinUserAsync payload >>> ', payload);
    },
    [joinUserAsync.pending.toString()]: (_state) => {},
    [joinUserAsync.rejected.toString()]: (_state) => {},
    [checkIDupAsync.fulfilled.toString()]: (_state, { payload }) => {
      console.log('checkIDupAsync payload >>> ', payload);
    },
    [checkIDupAsync.pending.toString()]: (_state) => {},
    [checkIDupAsync.rejected.toString()]: (_state) => {}
  }
});

export default joinSlice.reducer;
