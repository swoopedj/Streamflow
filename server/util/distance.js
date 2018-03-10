module.exports = (origin, site) => {
  var radlat1 = Math.PI * Number(origin.lat)/180;
  var radlat2 = Math.PI * site.latitude/180;
  var theta = Number(origin.lng)-site.longitude;
  var radtheta = Math.PI * theta/180;
  var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
  dist = Math.acos(dist);
  dist = dist * 180/Math.PI;
  dist = dist * 60 * 1.1515;
  dist = Math.round(dist * 10) / 10;
  return dist;
};