export const getSrcImages = (val) => {
  var m,
    urls = [],
    rex = /<img.*?src=["|'](.*?)["|']/g;

  while ((m = rex.exec(val))) {
    urls.push(m[1]);
  }

  return urls;
};
