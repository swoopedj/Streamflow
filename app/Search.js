import React from 'react';
import data from '../data.js';

const Search = () => (
  <div className="search">
    {data.sites.map((site, i) => {
      return (
        <h3 key={i}>{site.site_name}</h3>
      );
    })}
  </div>
);

export default Search;