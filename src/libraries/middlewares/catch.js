module.exports = (response, req, res, next) => {
  let responseStatus = response.status;
  responseStatus = response.error ? response.error.status || 500 : null;
  responseStatus = responseStatus || 200;
  delete response.status;

  const responseSchema = {
    error   : !!response.error || undefined,
    code    : response.error ? response.error.code : response.code || undefined,
    message : response.error ? response.error.message : response.message || undefined,
    result  : response.error ? undefined : response.result,
  };

  res.status(responseStatus).json(responseSchema);
};
