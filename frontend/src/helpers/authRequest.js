const authRequest = (user) => {
  let config = {
    headers: { Authorization: `Bearer ${user?.token}` },
  };
  return config;
};

const addParams = (config, params) => {
  config.params = params;
  return config;
};

module.exports = { authRequest, addParams };
