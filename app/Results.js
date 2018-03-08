import React from 'react';
import data from '../data.js';
import SiteList from './SiteList';

const Results = () => (
  <SiteList site_list={data.sites} />
);

export default Results;