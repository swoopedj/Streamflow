const request = require('request-promise');
const stats_formatter = require('../util/format-stats.js');
const Stats = module.exports;

// GET request to USGS Stats API for daily stats for specific site id
Stats.getDailyStats = async function(siteIds){
  const dailyUri = `https://waterservices.usgs.gov/nwis/stat/?format=rdb&sites=${siteIds.join(',')}&statReportType=daily&statTypeCd=all&parameterCd=00065,00062,00060,62614,62615&Access=0`;
  const dailyOptions = {
    uri: dailyUri,
    json: true
  };

  const dailyStats = await request(dailyOptions);
  report = await stats_formatter(siteIds, dailyStats);
  return report;
};

// Stats.getFloodStages = async function(siteIds){
//   const floodStages = await siteIds.map(id => {
//     const uri = `https://waterwatch.usgs.gov/wwapps/wwahps.php?ct=floodstage&site_no=&{id}`
//     const options = {
//       uri: uri,
//       json: true
//     };
//     // must make callback async
//     // const stagesForSite = await request(options);
//     return stagesForSite;
//   })

//   report = await stats_formatter(siteIds, dailyStats);
//   return report;
// };
