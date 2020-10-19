var fs = require('fs');
var path = require('path');
const config = require('./config');

const readFile = fileName => {
    try {
      return fs.readFileSync(path.resolve(fileName));
    } catch (error) {
      console.log(error);
      return undefined;
    }
  };
  
  const rootCertificate = readFile(config.protonSSLRootCertificate);
  const clientCertificate = readFile(config.protonSSLClientCertificate);
  const clientKey = readFile(config.protonSSLClientKey);
  
  
  
  const { useServer } = require('@domino/domino-db');
  const serverConfig = {
      hostName: config.protonHostName, // DNS (!) Host name of your server
      // See scripts to create kyr-file and ca for adoption !
      connection: {
          port: config.protonHostPort, // Proton port on your server
          secure: true,
      },
      credentials: {
        rootCertificate,
        clientCertificate,
        clientKey
      }
  };

  module.exports = serverConfig;