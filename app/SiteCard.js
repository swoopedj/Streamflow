import React from 'react';
import SiteDetail from './SiteDetail';

class SiteCard extends React.Component {

  state = {
    dataDescriptor: '',
    discharge: this.props.data.discharge || '',
    displayValue: '',
    graphOpened: false,
    isExpanded: false,
    streamName: ''
  }

  componentWillMount() {
    this.formatName();
    this.formatDV();
  }

  formatDV = () => {
    if (this.props.data.isReservoir) {
      this.setState({displayValue: `${this.props.data.res_elevation} ft.`, dataDescriptor: 'Elevation:'})
      return;
    }
    if (!this.state.discharge) {
      this.setState({displayValue: `${this.props.data.gage_height} ft.`, dataDescriptor: 'Gage Height:'});
      return;
    }
    this.setState({displayValue: `${this.state.discharge} ft.\u00B3/s`, dataDescriptor: 'Discharge:'});
  }

  formatName = () => {
    const name = this.props.data.site_name;
    const ioAT = name.indexOf(' AT ');
    const ioat = name.indexOf(' at ');
    const ioNR = name.indexOf(' NR ');
    const ionr = name.indexOf(' nr ');
    if (ioAT > 0 || ioat > 0) {
      const partition = ioAT < 0 ? ' at ' : ' AT ';
      this.setState({streamName: name.split(partition)[0]});
      return;
    }
    if (ioNR > 0 || ionr > 0) {
      const partition = ioNR < 0 ? ' nr ' : ' NR ';
      this.setState({streamName: name.split(partition)[0]});
      return;
    }
    this.setState({streamName: this.props.data.site_name});
  }

  toggleExpand = (e) => {
    e.preventDefault();
    this.setState({isExpanded: !this.state.isExpanded});
  }

  render() {
    const { dataDescriptor, displayValue, distFromOrigin, graphOpened, isExpanded, streamName } = this.state;
    const { data } = this.props;

    return (
      <div>
        <a href="">
          <div className={'site_card' + (isExpanded ? ' active' : '')} onClick={this.toggleExpand}>
            <div className="info-wrapper">
              <span className="primary-info">{streamName}</span>
              <span className="distance">{data.distFromOrigin} mi</span>
            </div>
            <div className="info-wrapper">
              <span className="descriptor">{dataDescriptor}</span>
              <span className="primary-info">{displayValue}</span>
            </div>
          </div>
        </a>
        <div className={isExpanded ? 'expanded' : 'hidden'}>
          <SiteDetail data={data} streamName={streamName} graphOpened={graphOpened} toggleHandler={this.toggleExpand}/>
        </div>
      </div>
    );
  }
}

export default SiteCard;
