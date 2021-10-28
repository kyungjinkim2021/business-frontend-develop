export interface IAuthSignUpState {
  success: boolean | null;
  message: string;
  authCnt?: number | undefined;
  expireDate?: string;
  authCode?: string | undefined;
  userInfo?: any;
  data?: any;
  code?: string | undefined;
  accessToken?: string | undefined;
}
