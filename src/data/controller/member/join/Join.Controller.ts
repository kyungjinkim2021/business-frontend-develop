import axios, { AxiosResponse } from 'axios';
export interface ApiResult {
  success: boolean;
  message: string;
  code?: string;
  data?: any;
}
export type JoinType = {
  address: string;
  agreeOfTerms: boolean;
  birthDay: string;
  company: string;
  email: string;
  gender: string;
  idDupChecked: boolean;
  name: string;
  password: string;
  passwordRe: string;
  phone1: string;
  phone2: string;
  phone3: string;
  smsConfirm: boolean;
  userType: 'cooperateComp';
};

export type CheckIdDupType = {
  available?: boolean;
  userId: string;
};

export const joinUser = (
  input: Partial<JoinType>
): Promise<AxiosResponse<any>> => {
  return axios.post(`/api/open/account/regist/normal`, input);
};

export const checkIdDup = (
  req: Partial<CheckIdDupType>
): Promise<AxiosResponse<any>> => {
  return axios.post(`/api/open/account/checkIdDup`, req);
};
