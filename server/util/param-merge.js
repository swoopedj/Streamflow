
module.exports = (site_array) => {
  let listArray = [];
  let listObj = {};

  site_array.map(site => {
    let site_id = site.site_id;
    
    if(listObj[site_id]){
      listObj[site_id].parameterArray.push(site.parameter);
    } else {
      listObj[site_id] = site;
    } 
  });

  for(var key in listObj){
    listArray.push(listObj[key]);
  }

  return listArray.sort(function(a, b){
    if(a.distFromOrigin > b.distFromOrigin){
      return 1;
    }
    if(a.distFromOrigin < b.distFromOrigin){
      return -1;
    } else {return 0;}
  });
};
