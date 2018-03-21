require('dotenv').config();
const request = require('request');
const formatBbox = require('../util/format-bbox.js');
const formatSite = require('../util/format-site.js');
const mergeSiteParams = require('../util/param-merge.js');
const geo_key = process.env.GOOGLE_GEO_KEY;

var Search = module.exports;

// GET request to Google Maps for Lat/Long coordinates of an address 
Search.getLatLongCoordinates = function(address){  
  var baseUrl =  `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${geo_key}`;
  var options = {
    url: baseUrl
  };
  return new Promise(function(resolve, reject){
    request.get(options, function(error, response, body){
      if(error){
        reject(error);
      } else {
        response.body = JSON.parse(body);
        resolve(response.body);
      }
    });
  });
};


// GET request to USGS for sites within Lat/Long boundary box
Search.findSitesInBoundaryBox = function(coordinates, radius){
  var baseUrl =  'http://waterservices.usgs.gov/nwis/iv/?format=json,1.1&bBox=';
  var formattedBbox = formatBbox(coordinates, radius);
  var options = {
    url: baseUrl + formattedBbox + '&parameterCd=00060,00065,00062,62615,62614',
  };
  return new Promise(function(resolve, reject){
    request.get(options, function(error, response, body){
      if(error){
        reject(error);
      } else {
        response.body = JSON.parse(body);
        let site_list = response.body.value.timeSeries.map((site) => {
          return formatSite(site, coordinates);
        });
        resolve(mergeSiteParams(site_list));
      }
    });
  });
};

//GET request to USGS for specific site id
Search.getDataBySiteId = function(siteId){
  var baseUrl =  'http://waterservices.usgs.gov/nwis/iv/?format=json,1.1&sites=' + siteId;
  var options = {
    url: baseUrl,
  };
  return new Promise(function(resolve, reject){
    request.get(options, function(error, response, body){
      if(error){
        reject(error);
      } else {
        response.body = JSON.parse(body);
        resolve(response.body);
      }
    });
  });
};