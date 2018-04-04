const router = require('express').Router();
const Search = require('../search/controller.js');
const Stats = require('../stats/controller.js');


router.get('/address', function(req, res){
  Search.getLatLongCoordinates(req.query.address)
  .then(function(response){
    res.send(response);
  });
}); 

router.get('/bBox', function(req, res){
  Search.findSitesInBoundaryBox(req.query.coords, req.query.radius)
  .then(function(response){
    res.send(response);
  });
});

router.get('/geo-bBox', function(req, res){
  Search.findSitesInBoundaryBox(req.query)
  .then(function(response){
    res.send(response);
  });
});

router.get('/siteId/:id', function(req, res){
  Search.getDataBySiteId(req.params.id)
  .then(function(response){
    res.send(response);
  });
}); 

router.get('/stats', function(req, res){
  Stats.getDailyStats(req.query.ids)
  .then(function(response){
    res.send(response);
  });
}); 

module.exports = router;