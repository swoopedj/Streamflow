import React from 'react';
import SiteDetail from './SiteDetail';

class SiteCard extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      discharge: this.props.data.discharge || '',
      isExpanded: false,
      graphOpened: false,
      streamName: '',
    };

    this.formatName = this.formatName.bind(this);
    this.toggleExpand = this.toggleExpand.bind(this);
  }

  componentWillMount() {
    this.formatName();
  }

  formatName() {
    let name = this.props.data.site_name;
    let ioAT = name.indexOf(' AT ');
    let ioat = name.indexOf(' at ');
    let ioNR = name.indexOf(' NR ');
    let ionr = name.indexOf(' nr ');
    if (ioAT < 0 && ioat < 0) {
      let partition = ioNR < 0 ? ' nr ' : ' NR ';
      this.setState({streamName: name.split(partition)[0]});
      return;
    }
    if (ioNR < 0 && ionr < 0) {
      let partition = ioAT < 0 ? ' at ' : ' AT ';
      this.setState({streamName: name.split(partition)[0]});
      return;
    }
    this.setState({streamName: this.props.data.site_name});
    console.log('streamName ===> ', this.state.streamName);
  }

  toggleExpand(e) {
    e.preventDefault();
    this.setState({isExpanded: !this.state.isExpanded});
  }

  render() {
    return (
      <div>
        <a href="">
          <div className={'site_card' + (this.state.isExpanded ? ' active' : '')} onClick={this.toggleExpand}>
            <div className="site_name">
              <span>{this.state.streamName}</span>
            </div>
            <div className='site_distance'>
              <span>({this.props.data.distFromOrigin} mi)</span>
            </div>
            <span className="discharge">{this.state.discharge + (this.state.discharge ? ' ft.'+ '\u00B3' + '/s' : '')}</span>
          </div>
        </a>
        <div className={this.state.isExpanded ? 'expanded' : 'hidden'}>
          <SiteDetail data={this.props.data} streamName={this.state.streamName} graphOpened={this.state.graphOpened} toggleHandler={this.toggleExpand}/>
        </div>
      </div>
    );
  }
}

export default SiteCard;
