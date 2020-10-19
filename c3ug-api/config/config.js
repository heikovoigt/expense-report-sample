/* © Copyright SIT GmbH, 2020.  All Rights Reserved. */
module.exports = {
     
    // The client application port
    port: 8084,
    
    // The base URL for the Domino Server to talk to
    baseURL: 'https://sitfp10.sit.de/',
  
    
    // The path to the design database on the PROTON Server
    expenseDbFilePath: {
      filePath: 'c3ugexpense.nsf',  
    },
  
    // The valid access tokens for the API

    access_tokens:["GwsLYpfvgBQA9VpXoX9H9u","ARjs8hjGjezdXceQrLkW1w","5WpZzSwsqCmsYRFcoUBeiH"],
        
    // PROTON SSL CONFIG and HOSTNAME
  
    protonHostName:'sitfp10.sit.de',
    protonHostPort: '3002',
    protonSSLRootCertificate : './certificates/sitfp10/ca.crt',
    protonSSLClientCertificate : './certificates/sitfp10/app1.crt',
    protonSSLClientKey : './certificates/sitfp10/app1.key',
  
    // API SSL Definitions
  
    apiSSLKey: 'certificates/sitfp10/iamserver.key',
    apiSSLCert: 'certificates/sitfp10/iamserver.crt',
  
    // Internal RSS Feeds Base URL

    internalRSSFeedBaseUrl:'https://dlr.rlp.de/internet/global/SitRSSFeed.nsf/rss?OpenAgent&uid=',
  
    // Feed-DB Path

    feedDbFilePath: {
        filePath: 'dlr2/webnew/RSSFeeds.nsf',  
      },

    // Feed Definitions

    feed_title: 'DLR Feed Aggregator',
    feed_description: 'We deliver excellence in agriculture',
    feed_url: 'http://dlr.rlp.de/rssapi/aggregation/',
    feed_site_url: 'http://dlr.rlp.de',
    feed_image_url: 'http://dlr.rlp.de/icon.png',
    feed_docs: 'http://dlr.rlp.de/rss/docs.html',
    feed_managingEditor: 'Herwig Köhler',
    feed_webMaster: 'Herwig Köhler',
    feed_copyright: '2020 Herwig Köhler',
    feed_language: 'de',
    feed_categories: ['Category 1','Category 2','Category 3'],
    feed_pubDate: '',
    feed_ttl: '60',

  };
  