import React from "react";
import { ILoginResult } from "apis/types/auth";
import { sessionLocalStorage } from "helpers/session";
import { IAction } from "./types";

const LOGIN: string = "LOGIN";
const LOGOUT: string = "LOGOUT";

export const ACTIONS = {
  LOGIN,
  LOGOUT,
};

export interface IState {
  isLogined: boolean;
  user: ILoginResult;
}

const session = sessionLocalStorage.getItem();

export const initialState = {
  isLogined: !!session.userId,
  user: session,
};

const logReducer = (state: IState, { type, payload }: IAction) => {
  switch (type) {
    case ACTIONS.LOGIN: {
      //登录
      sessionLocalStorage.setItem(payload?.user);
      return {
        ...state,
        isLogined: true,
        user: payload?.user,
      };
    }
    case ACTIONS.LOGOUT: {
      //登出
      sessionLocalStorage.removeItem();
      return {
        ...state,
        isLogined: false,
        user: {},
      };
    }
    default:
      return state;
  }
};

export default logReducer;

export const LogStateContext = React.createContext<IState>(initialState);
export const LogDispatchContext = React.createContext<React.Dispatch<IAction>>(
  () => {}
);
