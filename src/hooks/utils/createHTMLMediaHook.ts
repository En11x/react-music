import * as React from "react";
import useSetState from "hooks/useSetState";
import parseTimeRanges from "./parseTimeRanges";

export interface HTMLMediaProps
  extends React.AudioHTMLAttributes<any>,
    React.VideoHTMLAttributes<any> {
  src: string;
}

export interface HTMLMediaState {
  buffered: any[];
  duration: number;
  paused: boolean;
  muted: boolean;
  time: number;
  volume: number;
}

export interface HTMLMediaControls {
  play: () => Promise<void> | void;
  pause: () => void;
  //静音
  mute: () => void;
  unmute: () => void;
  volume: (volume: number) => void;
  seek: (time: number) => void;
}

const createHTMLMediaHook = (tag: "audio" | "video") => {
  const hook = (
    elOrProps: HTMLMediaProps | React.ReactElement<HTMLMediaProps>
  ): [
    React.ReactElement<HTMLMediaProps>,
    HTMLMediaState,
    HTMLMediaControls,
    { current: HTMLAudioElement | null }
  ] => {
    let element: React.ReactElement<any> | undefined;
    let props: HTMLMediaProps;

    if (React.isValidElement(elOrProps)) {
      element = elOrProps;
      props = element.props;
    } else {
      props = elOrProps as HTMLMediaProps;
    }

    console.log(elOrProps, element, props, "0-0-0");

    const [state, setState] = useSetState<HTMLMediaState>({
      buffered: [],
      duration: 0,
      paused: true,
      muted: false,
      time: 0,
      volume: 1,
    });

    console.log(state, "0o0o00o0o");

    //audio 标签
    const ref = React.useRef<HTMLAudioElement | null>(null);

    const wrapEvent = (userEvent: any, proxyEvent?: any) => {
      return (event: React.BaseSyntheticEvent) => {
        try {
          proxyEvent && proxyEvent(event);
        } finally {
          userEvent && userEvent(event);
        }
      };
    };

    //监听播放事件
    const onPlay = () => {
      console.log("播放了");
      setState({ paused: false });
    };
    //监听暂停事件
    const onPause = () => {
      console.log("暂停了");
      setState({ paused: true });
    };
    //监听音量
    const onVolumeChange = () => {
      const el = ref.current;
      if (!el) {
        return;
      }
      setState({
        muted: el.muted,
        volume: el.volume,
      });
    };

    //改变音频时长
    const onDurationChange = () => {
      const el = ref.current;
      if (!el) return;
      const { buffered, duration } = el;
      setState({
        buffered: parseTimeRanges(buffered),
        duration,
      });
    };

    //改变歌曲播放当前时间  监听时间
    const onTimeUpdate = () => {
      const el = ref.current;
      if (!el) return;
      setState({
        time: el.currentTime,
      });
    };

    //监听进度条
    const onProgress = () => {
      const el = ref.current;
      if (!el) return;
      setState({
        buffered: parseTimeRanges(el.buffered),
      });
    };

    if (element) {
      element = React.cloneElement(element, {
        controls: false, //显示控件
        ...props,
        ref,
        onPlay: wrapEvent(props.onPlay, onPlay),
        onPause: wrapEvent(props.onPause, onPause),
        onVolumeChange: wrapEvent(props.onVolumeChange, onVolumeChange),
        onDurationChange: wrapEvent(props.onDurationChange, onDurationChange),
        onTimeUpdate: wrapEvent(props.onTimeUpdate, onTimeUpdate),
        onProgress: wrapEvent(props.onProgress, onProgress),
      });
    } else {
      element = React.createElement(tag, {
        controls: false,
        ...props,
        ref,
        onPlay: wrapEvent(props.onPlay, onPlay),
        onPause: wrapEvent(props.onPause, onPause),
        onVolumeChange: wrapEvent(props.onVolumeChange, onVolumeChange),
        onDurationChange: wrapEvent(props.onDurationChange, onDurationChange),
        onTimeUpdate: wrapEvent(props.onTimeUpdate, onTimeUpdate),
        onProgress: wrapEvent(props.onProgress, onProgress),
      } as any);
    }

    let lockPlay: boolean = false;

    const controls = {
      play: () => {
        const el = ref.current;
        if (!el) return undefined;

        if (!lockPlay) {
          const promise = el.play();
          const isPromise = typeof promise === "object";

          if (isPromise) {
            lockPlay = true;
            const restLock = () => {
              lockPlay = false;
            };
            promise.then(restLock, restLock);
          }
          return promise;
        }
        return undefined;
      },

      pause: () => {
        const el = ref.current;
        if (el && !lockPlay) {
          return el.pause();
        }
      },

      seek: (time: number) => {
        const el = ref.current;
        if (!el || state.duration === undefined) {
          return;
        }
        time = Math.min(state.duration, Math.max(0, time));
        el.currentTime = time;
      },

      //设置音量
      volume: (volume: number) => {
        const el = ref.current;
        if (!el) return;
        volume = Math.min(1, Math.max(0, volume));
        el.volume = volume;
        setState({
          volume,
        });
      },
      mute: () => {},
      unmute: () => {},
    };

    React.useEffect(() => {
      const el = ref.current;

      console.log(el, "????");
    }, [props.src]);
    return [element, state, controls, ref];
  };
  return hook;
};

export default createHTMLMediaHook;
