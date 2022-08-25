export const getError = (error) => {
  return error.response && error.response.data.messaage
    ? error.response.data.messaage
    : error.messaage;
};
