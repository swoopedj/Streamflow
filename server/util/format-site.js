const distance = require('./distance.js');

module.exports = (siteData, origin) => {
  let siteObj = {};
  siteObj.site_id = siteData.sourceInfo.siteCode[0].value;
  siteObj.site_name = siteData.sourceInfo.siteName;
  siteObj.site_coordinates = siteData.sourceInfo.geoLocation.geogLocation;
  siteObj.parameter = {
    code: siteData.variable.variableCode[0].value,
    value: siteData.values[0].value[0].value,
    time: siteData.values[0].value[0].dateTime
  };
  siteObj.parameterArray = [siteObj.parameter];
  siteObj.distFromOrigin = origin ? distance(JSON.parse(origin), siteObj.site_coordinates) : null;
  if(siteObj.parameter.code === '00060'){
    siteObj.parameter.param_name = 'Stream Flow: ';
    siteObj.parameter.param_unit = 'ft.\u00B3/sec.';
  }
  else if(siteObj.parameter.code === '00065'){
    siteObj.parameter.param_name = 'Gage Height: ';
    siteObj.parameter.param_unit = 'ft.';
  }
  else if(siteObj.parameter.code === '00062'){
    siteObj.parameter.param_name = 'Reservoir Elevation: ';
    siteObj.parameter.param_unit = 'ft.';
  }

  return siteObj;
};
