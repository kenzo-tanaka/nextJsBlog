export const isURL = (url: string) => {
  try {
    new URL(url);
  } catch (e) {
    return false;
  }
  return true;
};
