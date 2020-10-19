 'use strict';
var cors = require('cors');
//var expressValidator = require('express-validator');

const config = require('../../config/config');
const { expenseCategory } = require('../schemas/schemas');

function checkAccess(req, res, next) {
  try {
    var back = {};
    
    //const body = req.body;
    let session_token =
      req.headers["x-access-token"] || req.headers["authorization"]; // Express headers are auto converted to lowercase
      //console.log("session token", session_token);
    if (session_token != undefined && session_token.startsWith("Bearer ")) {
      // Remove Bearer from string
      session_token = session_token.slice(7, session_token.length);
    }

    //console.log("session token", session_token);

    if (session_token == undefined) {
      res.status(401).send("Unauthorized Request");
      return false;
    }

    const valid_tokens = config.access_tokens;
    if(valid_tokens.includes(session_token)) {
      return next();
    } else {
      
      res.status(401).send("Unauthorized Request");
      return false;
    }

  } catch (error) {
    //console.error(error);
    
    res.status(500).send("Internal Error");
    return false;
  }
}

module.exports = function (app) {
    var c3ug_api = require('../controllers/controller');
    //app.use(expressValidator());
    var corsOptions = {
      origin: '*',
      optionsSuccessStatus: 200
    }
    app.use(cors(corsOptions));
    app.options('*', cors(corsOptions));
      //app.get('/expense_api/category/:id',ceckAccess,rss_api.get_expensecategory_by_id);
      app.get('/expense_api/categories',checkAccess,c3ug_api.get_expensecategories);
      //app.get('/expense_api/categories',c3ug_api.get_expensecategories);
      app.get('/expense_api/category/:id',checkAccess,c3ug_api.get_expensecategory_by_id);
      app.post('/expense_api/category',checkAccess,c3ug_api.post_expensecategory_by_id);
      app.put('/expense_api/category/:id',checkAccess,c3ug_api.put_expensecategory_by_id);
      app.delete('/expense_api/category/:id',checkAccess,c3ug_api.delete_expensecategory_by_id);
      
  };