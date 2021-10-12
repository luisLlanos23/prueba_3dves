/* eslint-disable no-useless-catch */
const axios = require('axios').default;

module.exports = {
  async instance(options) {
    try {
      const instance = axios.create(options);
      const { data } = await instance();
      return { data };
    } catch (error) {
      throw error;
    }
  },
};
