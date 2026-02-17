let showToastFn = null;

export const registerToast = (fn) => {
  showToastFn = fn;
};

export const toastBridge = {
  show: (message, type = "error") => {
    if (showToastFn) {
      showToastFn(message, type);
    }
  },
};
