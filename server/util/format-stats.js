const converter = require('csvtojson');
const parser = require('csv-parse');

module.exports = (siteIds, statsData) => {
  const dayOfMonth = new Date().getDate().toString();
  let statsObj = {};
  siteIds.forEach(id => {
    statsObj[id] = {};
  })

  return new Promise((resolve, reject) => {
    parser(statsData, {delimiter: '\t', columns: true, comment: '#'}, (err, output) => {
      if (err) {
        reject(err);
      }

      output.forEach(stat => {
        if(stat.day_nu === dayOfMonth) {
          statsObj[stat.site_no][stat.parameter_cd] = stat;
        }
      })
      resolve(statsObj);
    });
  })
};