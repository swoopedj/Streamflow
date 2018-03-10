
module.exports = (site_array) => {
  let listArray = [];
  let listObj = {};

  site_array.map(site => {
    let site_id = site.site_id;
    
    if(listObj[site_id]){
      listObj[site_id].parameterArray.push(site.parameter);
      if (!listObj[site_id].discharge) listObj[site_id].discharge = site.discharge || null;
      if (!listObj[site_id].gage_height) listObj[site_id].gage_height = site.gage_height || null;
      if (!listObj[site_id].res_elevation) listObj[site_id].res_elevation = site.res_elevation || null;
      if (!listObj[site_id].q_graph_link) listObj[site_id].q_graph_link = site.q_graph_link;
      if (!listObj[site_id].gh_graph_link) listObj[site_id].gh_graph_link = site.gh_graph_link;
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
