/* eslint-disable no-useless-escape */
const resolveObjectPath = (
  object: Record<string, any>,
  path: string,
  defaultValue: any
) => {
  return path
    .split(/[\.\[\]\'\"]/)
    .filter((p) => p)
    .reduce((o, p) => (o ? o[p] : defaultValue), object);
};

export default resolveObjectPath;
