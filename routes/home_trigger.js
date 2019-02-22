var express = require('express');
var router = express.Router();
const db = require('../model/sql_access.js');
const crypto = require("../controller/crypto");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* POST analysis. */
router.post('', async (req, res, next) => {
    console.log("----------------------------------------------------------------------");
    console.log("Body:");
    console.log(req.body);
    console.log("----------------------------------------------------------------------");
    console.log("Is connected:");
    console.log(await isConnected(req));
    console.log("----------------------------------------------------------------------");
    // console.log("Location: " + req.body.queryResult.parameters.location);
    // console.log("Action: " + req.body.queryResult.parameters.actions);
  
    res.setHeader('Content-Type', 'application/json');
    res.send("Bon Matin!");
});






isConnected = async (req) => {
  if (req.body.api_key == null) {
    console.log("No Key");
    return false;
  }

  apiKey = await db.apiKeys.findOne({
    where: {
      key:  crypto.generateHash(req.body.api_key),
      active: true
    }
  });

  if (apiKey === null) {
    console.log("Bad Key");
    return false;
  }
  
  return true;
}













module.exports = router;
