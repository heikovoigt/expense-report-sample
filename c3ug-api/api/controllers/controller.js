"use strict";
const ExpenseCategory = require("../models/expenseCategory");
const { useServer } = require("@domino/domino-db");
const serverConfig = require("../../config/server-config");
const config = require("../../config/config");

const databaseConfig = config.expenseDbFilePath;


exports.get_expensecategory_by_id = async function (req,res) {
  
  try {
  const id = req.params.id;
  var expenseCategory = await ExpenseCategory.findById(id);
  res.status = 200;
  res.json(expenseCategory.data);
  } catch (error) {
    console.error(error);
    res.status = 500;
    res.json({result:"ERROR",error:error});
  }
};

exports.delete_expensecategory_by_id = async function (req,res) {
  
  try {
  const id = req.params.id;
  var expenseCategory = await ExpenseCategory.findById(id);
  
  var back = await expenseCategory.delete();
  res.status = 200;
  res.json(back);
  } catch (error) {
    console.error(error);
    res.status = 500;
    res.json({result:"ERROR",error:error});
  }
};

exports.post_expensecategory_by_id = async function (req,res) {
  try {
    
    
    const items = req.body;
    var unid="";
    if(items.hasOwnProperty('unid')) {
      unid = items.unid;
    }
    var expenseCategory = new ExpenseCategory(items);
    
    if(items.hasOwnProperty('expenseCategoryId') && items.expenseCategoryId!=null) {
      var id = items.expenseCategoryId;
    
      var ec_data = await ExpenseCategory.findById(id);
    
      expenseCategory.set("expenseCategoryId",id);
      expenseCategory.set("unid",ec_data.data.unid);
    } else {
      if(items.hasOwnProperty('unid') && items.unid!=null) {
       expenseCategory = new ExpenseCategory(items);
       expenseCategory.set("unid",unid);
  }
} 
    var name = items.expenseCategoryName;
    expenseCategory.set("expenseCategoryName",name);
    var back = await expenseCategory.save();
    
    res.status = 200;
    res.json(expenseCategory.data);
  } catch (error) {
    console.error(error);
    res.status = 500;
    res.json({result:"ERROR",error:error});
  }
};

exports.put_expensecategory_by_id = async function (req,res) {
  try {
    
    var back = await post_expensecategory_by_id(req,res);
    
    res.status = 200;
    res.json(back);
  } catch (error) {
    console.error(error);
    res.status = 500;
    res.json({result:"ERROR",error:error});
  }
};

exports.get_expensecategories = async function (req,res) {

  try {
    
    useServer(serverConfig).then(async server => {
      const database = await server.useDatabase(databaseConfig);
      const documents = await database.bulkReadDocuments({
        query: "Form = 'expenseCategory'",
        itemNames: ["expenseCategoryId","expenseCategoryName"],
      });
    
      if (documents != undefined) {
      var category_list = [];
      var doclist = documents.documents;
    
      for(var i=0;i<doclist.length;i++) {
        const id = doclist[i].expenseCategoryId;
        const name = doclist[i].expenseCategoryName;
        const unid = doclist[i]["@unid"];
    
        var ec = new ExpenseCategory({expenseCategoryId:id,expenseCategoryName:name,unid:unid});
        ec.sanitize(ec.data);
        category_list.push(ec.data);
      }
    
      res.status=200;
      res.json(category_list);
    } else {
      res.status=200;
      res.json({result:"No expense categories available at present"});
    }
    });
   

  } catch (error) {
    console.error(error);
    res.status = 500;
    res.json({result:"ERROR",error:error});
  }
};

exports.generate_tokens = async function (req, res) {
  try {
    const uidgen = new UIDGenerator(UIDGenerator.BASE58);
    const token_one = await uidgen.generate();
    const token_two = await uidgen.generate();
    const token_three = await uidgen.generate();
    console.log("Tokens: ", token_one, token_two, token_three);
    res.status(200);
    res.send("Tokens have been generated.");
  } catch (error) {
    console.error(error);
    res.status(500);
    res.send("Tokens not generated.");
  }
};