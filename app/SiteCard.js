import React from 'react';

class SiteCard extends React.Component {
  render() {
    return (
      <a href={this.props.data.detail_link}>
        <div className='site_card'>
          <div className="site_name">
            <span>{this.props.data.site_name}</span>
          </div>
          <div className='site_distance'>
            <span>({this.props.data.distance} mi)</span>
          </div>
          <span className="g_height">{this.props.data.gage_height}</span>
        </div>
      </a>
    );
  }
}

export default SiteCard;
