import React from 'react';
import '../public/styles.css';
import SiteCard from './SiteCard.js';

class SiteList extends React.Component{

  state = {
    sites: this.props.site_list,
  }

  renderSiteList = () => {
    const list = this.props.site_list.map((site) => {
      return (
        <li key={site.site_id} >
          <SiteCard data={site} />
        </li>
      );
    });

    return (
      <div>
        <ul>
          {list}
        </ul>
      </div>
    );
  }

  render() {
    return (
      <div>
        {this.renderSiteList()}
      </div>
    );
  }
}

export default SiteList;
