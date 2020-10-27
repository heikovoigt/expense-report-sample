/* © Copyright SIT GmbH, 2020.  All Rights Reserved. */
module.exports = {
     
    // The client application port
    port: <your port>,
    
    // The base URL for the Domino Server to talk to
    baseURL: '<your url for domino>',
  
    
    // The path to the design database on the PROTON Server
    expenseDbFilePath: {
      filePath: '<your nsf>',  
    },
  
    // The valid access tokens for the API

    access_tokens:[],
        
    // PROTON SSL CONFIG and HOSTNAME
  
    protonHostName:'',
    protonHostPort: '',
    protonSSLRootCertificate : '',
    protonSSLClientCertificate : '',
    protonSSLClientKey : '',
  
    // API SSL Definitions
  
    apiSSLKey: '',
    apiSSLCert: '',
  
  };
  
