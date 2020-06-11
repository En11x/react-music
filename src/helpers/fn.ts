export const noop = () => {};

//防抖  函数fn在 interval里不会重复执行
export const debounce = (
  fn: Function,
  interval: number,
  immediate?: boolean
) => {
  let timer: NodeJS.Timer | null = null;

  return function (...args: any[]) {
    const ctx = this;

    if (timer) {
      clearTimeout(timer);
    }

    timer = setTimeout(() => {
      fn.apply(ctx, args);
    }, interval);
  };
};
