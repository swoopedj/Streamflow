const parseString = require('xml2js').parseString;

module.exports = (stats_data) => {
  return parseString(stats_data, (error, result) => {
    if(error) {
      throw new Error(error);
    }
    return result;
  });
};