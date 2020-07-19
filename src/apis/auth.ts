import { ILoginResult, ILoginRequest } from "./types/auth";
import axios, { requestWithoutErrorToast } from "helpers/axios";

type loginFn = (params: ILoginRequest) => Promise<ILoginResult>;

const login: loginFn = ({ phone, password }) => {
  return requestWithoutErrorToast({
    url: "/login/cellphone",
    params: {
      phone,
      password,
    },
  });
};

const logout = () => {
  return axios({
    url: "/logout",
    method: "post",
  });
};

export default {
  login,
  logout,
};
