const request = require('request');
const stats_formatter = require('../util/format-stats.js');
const Stats = module.exports;

// GET request to USGS Stats API for specific site id
Stats.getSiteStats = function(siteIds){
  var baseUrl =  `https://waterservices.usgs.gov/nwis/stat/?format=rdb&sites=${siteIds.join(',')}&statReportType=daily&statTypeCd=all&parameterCd=00065,00060&Access=0`;
  var options = {
    url: baseUrl,
  };
  return new Promise(function(resolve, reject){
    request.get(options, function(error, response, body){
      if(error){
        console.log('Error: ', error)
        throw new Error(error)
      } else {
        stats = parseString(stats_data, (error, result) => {
          if(error) {
            throw new Error(error);
          }
          // return result;
          response.body = stats_formatter(siteIds, result);
          resolve(response.body);
        });
      }
    })    
  })
};