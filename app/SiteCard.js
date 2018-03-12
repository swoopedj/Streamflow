import React from 'react';
import SiteDetail from './SiteDetail';

class SiteCard extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      isOpened: false,
    };

    this.toggleExpand = this.toggleExpand.bind(this);
  }

  toggleExpand(e) {
    e.preventDefault();
    this.setState({isOpened: !this.state.isOpened});
  }

  render() {
    return (
      <div>
        <a href="">
          <div className='site_card' onClick={this.toggleExpand}>
            <div className="site_name">
              <span>{this.props.data.site_name}</span>
            </div>
            <div className='site_distance'>
              <span>({this.props.data.distFromOrigin} mi)</span>
            </div>
            <span className="g_height">{this.props.data.gage_height} ft</span>
          </div>
        </a>
        <div className={this.state.isOpened ? 'expanded' : 'hidden'}>
          <SiteDetail data={this.props.data} toggleHandler={this.toggleExpand} />
        </div>
      </div>
    );
  }
}

export default SiteCard;
