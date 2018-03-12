import React from 'react';
import SiteDetail from './SiteDetail';

class SiteCard extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      isExpanded: false,
      graphOpened: false,
      streamName: this.props.data.site_name.split(' at ')[0],
    };

    this.toggleExpand = this.toggleExpand.bind(this);
    // this.toggleGraph = this.toggleGraph.bind(this);
  }

  // toggleGraph() {
  //   console.log('toggle hydrograph!');
  //   this.setState({graphOpened: !this.state.graphOpened});
  // }

  toggleExpand(e) {
    console.log('preventingDefault!!!!');
    e.preventDefault();
    // e.stopPropagation();
    // e.nativeEvent.stopImmediatePropagation();
    this.setState({isExpanded: !this.state.isExpanded});
  }

  render() {
    return (
      <div>
        <a href="">
          <div className={'site_card' + (this.state.isExpanded ? ' site_detail' : '')} onClick={this.toggleExpand}>
            <div className="site_name">
              <span>{this.state.streamName}</span>
            </div>
            <div className='site_distance'>
              <span>({this.props.data.distFromOrigin} mi)</span>
            </div>
            <span className="g_height">{this.props.data.gage_height} ft</span>
          </div>
        </a>
        <div className={this.state.isExpanded ? 'expanded' : 'hidden'}>
          <SiteDetail data={this.props.data} graphOpened={this.state.graphOpened} toggleHandler={this.toggleExpand}/>
        </div>
      </div>
    );
  }
}

export default SiteCard;
