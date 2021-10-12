const bonjour = require('bonjour')();

module.exports = {
  publishService: async (service) => {
    try {
      bonjour.publish(service);
      return { status: 'PUBLISHED' };
    } catch (error) {
      return error;
    }
  },
};
