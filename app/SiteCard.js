import React from 'react';
import Collapse from 'react-collapse';
import SiteDetail from './SiteDetail';

class SiteCard extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      isOpened: false,
      data: this.props.data
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
        <Collapse isOpened={this.state.isOpened}>
          <SiteDetail data={this.state.data} />
        </Collapse>
      </div>
    );
  }
}

export default SiteCard;
