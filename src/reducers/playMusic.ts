import React from "react";
import { IMyMusic } from "apis/types/business";
import {
  MODE,
  playMode as playModeLocalStorage,
  playHistory as playHistoryLocalStorage,
  playList as playListLocalStorage,
  setPlayHistory,
} from "helpers/paly";
import { IAction } from "./types";
import { getMusicUrl } from "helpers/business";
import {
  HTMLMediaState,
  HTMLMediaControls,
} from "hooks/utils/createHTMLMediaHook";

//actions
const PLAY: string = "PLAY";
const SET_PLAY_LIST: string = "SET_PLAY_LIST";
const CLEAR_PLAY_LIST: string = "CLEAR_PLAY_LIST";
const SET_PLAY_MODE: string = "SET_PLAY_MODE";
const SHOW_LYRIC: string = "SHOW_LYRIC";
const HIDE_LYRIC: string = "HIDE_LYRIC";
const CLEAR_PLAY_HISTORY: string = "CLEAR_PLAY_HISTORY";

export const ACTIONS = {
  PLAY,
  SET_PLAY_LIST,
  CLEAR_PLAY_LIST,
  SET_PLAY_MODE,
  SHOW_LYRIC,
  HIDE_LYRIC,
  CLEAR_PLAY_HISTORY,
};

//Reducer
export interface IState {
  musicId: number;
  musicUrl: string;
  music?: IMyMusic;
  playMode: MODE;
  showLyric: boolean;
}

//初始值
export const initialState = {
  musicId: 0,
  musicUrl: "",
  playMode: playModeLocalStorage.getItem(),
  showLyric: false,
};

//reduce
const playMusicReducer = (state: IState, { type, payload }: IAction) => {
  switch (type) {
    case ACTIONS.PLAY: {
      //播放音乐
      let playHistory: IMyMusic[] = [];
      if (!payload?.keepOrder) {
        //更新历史记录
        playHistory = setPlayHistory(payload?.music);
      }

      return {
        ...state,
        musicId: payload?.musicId,
        musicUrl: getMusicUrl(payload?.musicId),
        music: payload?.music,
      };
    }
    case ACTIONS.SET_PLAY_LIST: {
      const playList = payload?.playList || [];
      playHistoryLocalStorage.setItem(playList);
      return state;
    }
    case ACTIONS.SET_PLAY_MODE: {
      playModeLocalStorage.setItem(payload?.playMode);
      return {
        ...state,
        playMode: payload?.playMode || MODE.PLAY_IN_ORDER,
      };
    }
    //清除播放列表
    case ACTIONS.CLEAR_PLAY_LIST: {
      playListLocalStorage.removeItem();
      return state;
    }
    //清除历史记录
    case ACTIONS.CLEAR_PLAY_HISTORY: {
      playHistoryLocalStorage.removeItem();
      return state;
    }
    case ACTIONS.SHOW_LYRIC: {
      return {
        ...state,
        showLyric: true,
      };
    }
    case ACTIONS.HIDE_LYRIC: {
      return {
        ...state,
        showLyric: false,
      };
    }
  }
  console.log("kkkkk");
  return state;
};

export default playMusicReducer;

export interface IAudioContext {
  audio?: React.ReactElement<any> | undefined;
  state?: HTMLMediaState;
  controls?: HTMLMediaControls;
  ref?: {
    current: HTMLAudioElement | null;
  };
}

//context
export const PlayMusicStateContext = React.createContext<IState>(initialState);
export const PlayMusicDispatchContext = React.createContext<
  React.Dispatch<IAction>
>(() => {});
export const AudioContext = React.createContext<IAudioContext>({});
