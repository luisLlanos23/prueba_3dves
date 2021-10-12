const os = require('os');
const npmDns = require('dns');
const network = require('network');
const datatype = require('../../libraries/tools/datatype');

module.exports = {
  async getNetworkConfiguration() {
    const hostname = os.hostname();
    const dns = npmDns.getServers().join(' ');
    const gateway = await this.getGateway();
    const interfaces = os.networkInterfaces();

    const key = Object.keys(interfaces);
    let interfaceName = '';
    if (key[0] === 'Ethernet') {
      interfaceName = 'etho';
    } else {
      interfaceName = 'wlan0'; 
    }

    const ethernet = interfaces.Ethernet || interfaces['Conexión de área local'] || interfaces.eth0;
    const wifi = interfaces['Wi-Fi'] || interfaces.lo;

    let networkConfiguration = {
      interface : interfaceName,
      hostname,
      address   : '',
      netmask   : '',
      mac       : '',
      gateway,
      dns,
    };

    const connectionInterface = ethernet || wifi;

    if (connectionInterface) {
      connectionInterface.forEach((_element, index) => {
        if (datatype.validateIp(connectionInterface[index].address)) {
          const { address, netmask, mac } = connectionInterface[index];
          networkConfiguration = {
            ...networkConfiguration,
            address,
            netmask,
            mac,
            dns,
          };
        }
      });
    }
    return networkConfiguration;
  },

  getGateway() {
    return new Promise((resolve) => {
      network.get_gateway_ip((error, gateway) => {
        if (error) { resolve('No Gateway'); }
        resolve(gateway);
      });
    });
  },
};
