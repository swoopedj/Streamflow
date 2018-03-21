const distance = require('./distance.js');

module.exports = (siteData, origin) => {
  let siteObj = {};
  let parameterValue = siteData.values[0].value[0].value;
  let siteId = siteData.sourceInfo.siteCode[0].value;

  siteObj.site_id = siteId;
  siteObj.site_name = siteData.sourceInfo.siteName;
  siteObj.site_coordinates = siteData.sourceInfo.geoLocation.geogLocation;
  siteObj.infoLink = `https://waterdata.usgs.gov/nwis/uv?site_no=${siteId}`;
  siteObj.parameter = {
    code: siteData.variable.variableCode[0].value,
    value: siteData.values[0].value[0].value,
    time: new Date(siteData.values[0].value[0].dateTime).toLocaleString()
  };
  siteObj.parameterArray = [siteObj.parameter];
  siteObj.distFromOrigin = origin ? distance(JSON.parse(origin), siteObj.site_coordinates) : null;
  if(siteObj.parameter.code === '00060'){
    siteObj.parameter.param_name = 'Stream Flow: ';
    siteObj.parameter.param_unit = 'ft.\u00B3/sec.';
    siteObj.discharge = parameterValue;
    siteObj.q_graph_link = `https://waterdata.usgs.gov/nwisweb/graph?agency_cd=USGS&site_no=${siteId}&parm_cd=00060&period=7`;
  }
  else if(siteObj.parameter.code === '00065'){
    siteObj.parameter.param_name = 'Gage Height: ';
    siteObj.parameter.param_unit = 'ft.';
    siteObj.gage_height = parameterValue;
    siteObj.gh_graph_link = `https://waterdata.usgs.gov/nwisweb/graph?agency_cd=USGS&site_no=${siteId}&parm_cd=00065&period=7`;
  }
  else if(siteObj.parameter.code === '00062' || siteObj.parameter.code === '62615' || siteObj.parameter.code === '62614'){
    siteObj.parameter.param_name = 'Reservoir Elevation: ';
    siteObj.parameter.param_unit = 'ft.';
    siteObj.res_elevation = parameterValue;
    siteObj.res_graph_link = `https://waterdata.usgs.gov/nwisweb/graph?agency_cd=USGS&site_no=${siteId}&parm_cd=${siteObj.parameter.code}&period=7`;
    siteObj.isReservoir = true;
  }

  return siteObj;
};
