var express = require('express');
var router = express.Router();
const db = require('../model/sql_access.js');
const crypto = require("../controller/crypto");
const accents = require('remove-accents');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* POST analysis. */
router.post('', async (req, res, next) => {
    console.log("");
    console.log("");
    console.log("");
    console.log("");
    console.log("");
    console.log("----------------------------------------------------------------------");
    console.log("------------------------- NEW CONNECTION -----------------------------");
    console.log("----------------------------------------------------------------------");
    console.log("Body:");
    console.log(req.body);
    console.log("----------------------------------------------------------------------");
    if(! await isConnected(req)){
      console.log("Not autorised.");
      console.log("----------------------------------------------------------------------");
      res.send(JSON.stringify({ "success": false, "error": "Unauthorised api key."}));	
			res.status(401);
    } else {
      console.log("Is connected!");
      console.log("----------------------------------------------------------------------");

      device = await findDevice(req.body.device);
      if (!device){
        console.log("Device not found.");
        console.log("----------------------------------------------------------------------");
        res.send(JSON.stringify({ "success": false, "error": "Device not found."}));	
        res.status(404);
      }
      else {
        console.log("Device:");
        console.log(device.name + "(id: " + device.id + ")");
        console.log("----------------------------------------------------------------------");


        action = await findAction(device, req.body.stateToSet);
        if (!action){
          console.log("Action not found.");
          console.log("----------------------------------------------------------------------");
          res.send(JSON.stringify({ "success": false, "error": "Action not found."}));	
          res.status(404);
        }
        else {
          console.log("Device:");
          console.log(action);
          console.log("----------------------------------------------------------------------");



          res.setHeader('Content-Type', 'application/json');
          res.send("Bon Matin!");
        }
      }
    }
});

isConnected = async (req) => {
  if (req.body.api_key == null) {
    return false;
  }

  apiKey = await db.apiKeys.findOne({
    where: {
      key:  crypto.generateHash(req.body.api_key),
      active: true
    }
  });

  if (apiKey === null) {
    return false;
  }
  
  return true;
}

findDevice = async (deviceText) => {
  if (deviceText == null) {
    return false;
  }

  deviceText = deviceText.replace(/([Ll][ae]?s? )/, '');
  deviceText = deviceText.replace(/(s($| ))/, '');
  deviceText = accents.remove(deviceText)
  console.log("Search: \"" + deviceText + "\"")

  device = await db.devices.findOne({
    where: {
      name:  deviceText
    }
  });

  if (device == null) {
    deviceName = await db.devicesNames.findOne({
      where: {
        text:  deviceText
      }, include: [db.devices]
    });

    if (deviceName == null) {
      return false;
    }

    device = deviceName.device;
  }

  return device
}

findAction = async (device, actionText) => {
  if (actionText == null) {
    return false;
  }

  actions = await device.getActions({
    where: {
      name:  actionText
    }
  });

  if (actions == null || actions.length < 1) {
    return false;
  }

  action = actions[0];

  method = await action.devices_actions.getMethod();

  return {
    name: action.name,
    comment: action.comment,
    method: method.name,
    command: action.devices_actions.command
  };
}

module.exports = router;
