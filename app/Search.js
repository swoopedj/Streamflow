import React from 'react';
import data from '../data.js';
import SiteList from './SiteList';

// const Search = () => (
//   <div className="search">
//     {data.sites.map((site, i) => {
//       return (
//         <h3 key={i}>{site.site_name}</h3>
//       );
//     })}
//   </div>
// );

const Search = () => (
  <SiteList site_list={data} />
);

export default Search;