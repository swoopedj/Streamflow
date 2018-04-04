const request = require('request');
const stats_formatter = require('../util/format-stats.js');
const Stats = module.exports;

// GET request to USGS Stats API for specific site id
Stats.getDailyStats = function(siteIds){
  var baseUrl =  `https://waterservices.usgs.gov/nwis/stat/?format=rdb&sites=${siteIds.join(',')}&statReportType=daily&statTypeCd=all&parameterCd=00065,00062,00060,62614,62615&Access=0`;
  var options = {
    url: baseUrl,
  };
  return new Promise(function(resolve, reject){
    request.get(options, function(error, response, body){
      if(error){
        reject(error);
      } else {
        response.body = stats_formatter(siteIds, body);
        resolve(response.body);
      }
    })
  })
};