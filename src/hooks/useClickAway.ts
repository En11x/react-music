//自定义hooks
import { useEffect, RefObject, useRef } from "react";

const defaultEvents = ["mousedown", "touchstart"];

export const on = (obj: any, ...args: any[]) => obj.addEventListener(...args);
export const off = (obj: any, ...args: any[]) =>
  obj.removeEventListener(...args);
//泛型函数
const useClickAway = <E extends Event = Event>(
  ref: RefObject<HTMLElement | null>,
  onClickAway: (event: E) => void,
  events: string[] = defaultEvents
) => {
  const savedCallback = useRef(onClickAway);
  useEffect(() => {
    console.log(1, onClickAway);
    savedCallback.current = onClickAway;
  }, [events, ref]); //仅在onClickAway 改变时更新

  useEffect(() => {
    console.log(2, events, ref);
    const handler = (event: any) => {
      const { current: el } = ref;
      el && !el.contains(event.target) && savedCallback.current(event);
    };

    for (const eventName of events) {
      on(document, eventName, handler);
    }
    return () => {
      //组件销毁时执行
      for (const eventName of events) {
        off(document, eventName, () => handler);
      }
    };
  }, [events, ref]);
};

export default useClickAway;
