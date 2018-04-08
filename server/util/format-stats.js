const parse = require('csv-parse');

module.exports = (siteIds, statsData) => {
  const dayOfMonth = new Date().getDate().toString();
  let statsObj = {};
  siteIds.forEach(id => {
    statsObj[id] = {};
  })

  return new Promise((resolve, reject) => {
    parse(statsData, {delimiter: '\t', columns: true, comment: '#'}, (err, output) => {
      if (err) {
        reject(err);
      }

      output.forEach(stat => {
        if(statsObj[stat.site_no] && stat.mean_va){
          if(statsObj[stat.site_no][stat.parameter_cd]) {
            statsObj[stat.site_no][stat.parameter_cd].push(stat);
          } else {
            statsObj[stat.site_no][stat.parameter_cd] = [stat];
          }
        }
      });
      resolve(statsObj);
    });
  })
};