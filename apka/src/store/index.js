// Local Storage

export const saveToLocalStorage = (state, stateName) => {
  try {
    const serialisedState = JSON.stringify(state);
    localStorage.setItem(stateName, serialisedState);
  } catch (error) {
    console.log(error);
  }
};

export const loadFromLocalStorage = (stateName) => {
  try {
    const serialisedState = localStorage.getItem(stateName);
    if (serialisedState === null) return undefined;
    return JSON.parse(serialisedState);
  } catch (error) {
    return undefined;
  }
};

// Utility functions

export const arrayBufferToBase64 = (buffer) => {
  var binary = "";
  var bytes = [].slice.call(new Uint8Array(buffer));
  bytes.forEach((b) => (binary += String.fromCharCode(b)));
  return window.btoa(binary);
};
