export const localStorageMiddleware = ({ getState }: any) => {
  return (next: any) => (action: any) => {
    const result = next(action);
    window.localStorage.setItem("r-todos", JSON.stringify(getState()));
    return result;
  };
};

export const reHydratesStore = () => {
  const getStore = window.localStorage.getItem("r-todos");

  if (getStore !== null) {
    return JSON.parse(getStore);
  }
};
