var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* POST analysis. */
// router.post('/', function(req, res, next) {
//   console.log("Device: " + req.body.queryResult.parameters.devices);
//   console.log("Location: " + req.body.queryResult.parameters.location);
//   console.log("Action: " + req.body.queryResult.parameters.actions);

//   res.setHeader('Content-Type', 'application/json');
//   res.send(JSON.stringify());
// });

module.exports = router;
