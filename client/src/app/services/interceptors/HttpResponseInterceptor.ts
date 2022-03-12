const resHandler = (res: any) => {
  return res.data;
};

const errResHandler = (err: any) => {
  console.debug("Http Error occured: " + JSON.stringify(err));
  return Promise.reject(err);
};

export { resHandler, errResHandler };
