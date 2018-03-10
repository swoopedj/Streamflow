module.exports = function(coords, radius) {
  let longitude_constant = 0.018315;
  let latitude_constant = 0.014492;
  let lat = Number(JSON.parse(coords).lat);
  let long = Number(JSON.parse(coords).lng);
  let bBox = {
    west: long - (radius * longitude_constant),
    south: lat - (radius * latitude_constant),
    east: long + (radius * longitude_constant),
    north: lat + (radius * latitude_constant)
  };
  let westLong = round(bBox.west).toString();
  let southLat = round(bBox.south).toString();
  let eastLong = round(bBox.east).toString();
  let northLat = round(bBox.north).toString();

  return westLong + ',' + southLat + ',' + eastLong + ',' + northLat;
};

function round(n){
  let str = n.toString();
  if(str.indexOf('.') !== -1){
    let index = str.indexOf('.');
    let decimalSlice = str.slice(index, index + 6);
    let integerSlice = str.slice(0, index);
    return Number(integerSlice + decimalSlice);
  } else {return n;}
}
