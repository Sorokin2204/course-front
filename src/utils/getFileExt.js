export const getFileExt = (name) => {
  return /(?:\.([^.]+))?$/.exec(name)[1];
};
