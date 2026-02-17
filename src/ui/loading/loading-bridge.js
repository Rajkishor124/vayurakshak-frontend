let startLoadingFn = null;
let stopLoadingFn = null;

export const registerLoadingFunctions = (start, stop) => {
  startLoadingFn = start;
  stopLoadingFn = stop;
};

export const loadingBridge = {
  start: () => {
    if (startLoadingFn) startLoadingFn();
  },
  stop: () => {
    if (stopLoadingFn) stopLoadingFn();
  },
};
