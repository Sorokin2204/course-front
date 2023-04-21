export const apiUrl = (path) => {
  return `${process.env.REACT_APP_SERVER_URL}/api/${path}`;
};
