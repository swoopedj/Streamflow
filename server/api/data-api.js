var router = require('express').Router();
var Search = require('../models/search-model.js');

router.get('/address/:address', function(req, res){
  var coordinates = Search.getLatLongCoordinates(req.params.address)
  .then(function(response){
    res.send(response);
  })
}); 

router.get('/bBox/:bBox', function(req, res){
  var results = Search.getSitesInBoundaryBox(req.params.bBox)
  .then(function(response){
    res.send(response);
  })
});

router.get('/geo-bBox', function(req, res){
  var results = Search.findSitesInBoundaryBox(req.query)
  .then(function(response){
    res.send(response);
  })
});

router.get('/siteId/:id', function(req, res){
  console.log(req.params.id)
  var data = Search.getDataBySiteId(req.params.id)
  .then(function(response){
    res.send(response);
  })
}); 

module.exports = router;