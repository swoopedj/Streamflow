const parse = require('csv-parse');

/* 
Currently getting daily data for every month of the year for each site, any way
to limit that?

use report type to do formatting
annual data sould be an array of objects w/ data for each year of stats
daily should just be an object for the day of the year?
*/

module.exports = (siteIds, statsData) => {
  const date = new Date();
  const month = (date.getMonth() + 1).toString();
  const dayOfMonth = date.getDate().toString();
  let statsObj = {};
  siteIds.forEach(id => {
    statsObj[id] = {};
  })

  return new Promise((resolve, reject) => {
    parse(statsData, {delimiter: '\t', columns: true, comment: '#'}, (err, output) => {
      if (err) {
        console.log('ERR in formatter = ', err)
        reject(err);
      }


      output.forEach(stat => {

        //daily stat
        if(stat.day_nu && stat.day_nu === dayOfMonth && stat.month_nu === month) {
          statsObj[stat.site_no][stat.parameter_cd] = stat;
        }
        
      });
      resolve(statsObj);
    });
  })
};