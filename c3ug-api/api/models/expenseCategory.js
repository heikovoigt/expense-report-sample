
const { useServer } = require("@domino/domino-db");

const serverConfig = require("../../config/server-config");
const config = require("../../config/config");
var schemas = require("../schemas/schemas.js");
var _ = require("lodash");
const databaseConfig = config.expenseDbFilePath;


const { v4: uuidv4 } = require('uuid');

var expenseCategory = function(data) {
    this.data = this.sanitize(data);
}

expenseCategory.prototype.data = {}

expenseCategory.prototype.changeName = function (name) {
    this.data.name = name;
}

expenseCategory.prototype.setId = function () {
    this.data.expenseCategoryId = uuidv4();
}

expenseCategory.prototype.get = function (name) {
    return this.data[name];
}

expenseCategory.prototype.set = function (name, value) {
    console.log(name,value);
    this.data[name] = value;
    console.log("Data: ",this.data);
}

expenseCategory.prototype.sanitize = function (data) {
    data = data || {};
    schema = schemas.expenseCategory;
    return _.pick(_.defaults(data,schema), _.keys(schema));
}
async function deleteFromDomino(self) {
  return new Promise(function (resolve, reject) {

    const query =  "Form = 'expenseCategory' and expenseCategoryId = '" + self.data.expenseCategoryId +    "'";
    
    useServer(serverConfig)
      .then(async (server) => {
        const database = await server.useDatabase(databaseConfig);
        const collection = await database.bulkDeleteDocuments({
          query: query,
        });
                
        resolve({result:"OK",error:null});
        
      })
      .catch((error) => {
        console.error(error);
        var back = {
            result: "ERROR",
            error: error
        };
        console.error(back);
        resolve(back);
      });
    });
}

expenseCategory.prototype.delete = async function () {
  try {
  var self = this;
  var back = await deleteFromDomino(self);
  return back;
  } catch (error) {
    console.error(error);
    return ({result:"ERROR",error:error});
  }
}

async function writeToDomino(self) {
  return new Promise(function (resolve, reject) {
    console.log("UNID ? ",self.data.unid);
    if(self.data.unid === null) {
      // new data set
      console.log("--> New Dataset!");
      useServer(serverConfig).then(async server => {
          const database = await server.useDatabase(databaseConfig);
          const unid = await database.createDocument({
            document: {
              Form: 'expenseCategory',
              expenseCategoryName: self.data.expenseCategoryName,
              expenseCategoryId: self.data.expenseCategoryId,
            },
          }); 
          console.log("UNID: ",unid);
          self.data.unid = unid;
          resolve(self.data.unid);
          //return self.data.unid;
        });

  } else {
      // Update
      console.log("--> Update Dataset!");
      useServer(serverConfig).then(async server => {
          const database = await server.useDatabase(databaseConfig);
          const document = await database.useDocument({
            unid: self.data.unid,
          });
          await document.replaceItems({
            replaceItems: { expenseCategoryName: self.data.expenseCategoryName, expenseCategoryId: self.data.expenseCategoryId },
          });
          resolve(self.data.unid);
          //return self.data.unid;
        });
   
  }


  });   
}

expenseCategory.prototype.save = async function () {
  try {
  var self = this;
  //return new Promise(function (resolve, reject, self) {
    
    //console.log("In Save: ",self.data);
    if(self.data.expenseCategoryId === null ) {
        self.data.expenseCategoryId = uuidv4();
    }
    
    self.data = self.sanitize(self.data);
    // Hier kommt Domino DB Call rein.
    //console.log("After sanitizing: ",self.data);
    
    const unid = await writeToDomino(self);

    return unid;

  } catch (error) {
    console.error(error);
    return(null);
  }


}

expenseCategory.findById = async function (id) {
    return new Promise(function (resolve, reject) {
        var back = {};
    
    const query =  "Form = 'expenseCategory' and expenseCategoryId = '" + id +    "'";
    //console.log("Query ", query);
    useServer(serverConfig)
      .then(async (server) => {
        const database = await server.useDatabase(databaseConfig);
        const collection = await database.bulkReadDocuments({
          query: query,
          itemNames: [
            "expenseCategoryName",
            "expenseCategoryId"
          ],
        });
        //console.log("--> collection: ",collection);
        var docs = collection.documents;
        //console.log(docs);
        if (docs != undefined) {
            var document = docs[0];
            //console.log("Items: ",document);
            
            //console.log("Items: ",document);
            var unid = document["@unid"];
            document["unid"] = unid;
            var ec = new expenseCategory(document);
            ec.set("unid",unid);
            resolve(ec);
        }
      })
      .catch((error) => {
        console.error(error);
        back = {
            id: "ERROR",
            name: error,
            unid: null,
        };
        console.error(back);
        resolve(back);
      });
    });
    
}

module.exports = expenseCategory;