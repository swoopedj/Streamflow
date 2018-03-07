import React from 'react';
import Modal from 'react-modal';
import '../public/styles.css';
import SiteCard from './SiteCard.js';
import SiteDetail from './SiteDetail.js';

class SiteList extends React.Component{

  constructor (props) {
    super(props);
    this.state = {
      modalIsOpen: false,
      modalData: null,
      sites: this.props.site_list
    };
  }

  openModal (i) {
    this.setState({modalIsOpen: true, modalData: this.state.sites[i]});
  }
 
  closeModal() {
    this.setState({modalIsOpen: false});
  }

  renderSiteList () {
    const list = this.state.sites.map((site, index) => {
      return (
        <li key={index} onClick={() => this.openModal(index)}>
          <SiteCard data={site} />
        </li>
      );
    });
    return (
      <div>
        <span>Site List Demo:</span>
        <ul>
          {list}
        </ul>
        <hr />
        <LocationSearch />
      </div>
    );
  }

  render() {
    return (
      <div>
        {this.renderSiteList()}
        <Modal 
          isOpen={this.state.modalIsOpen} 
          onRequestClose={this.closeModal} 
          contentLabel="Modal" 
          className="site_modal"
          overlayClassName="modal_overlay">
          <SiteDetail data={this.state.modalData} close={this.closeModal} />
          <a className="close_modal" onClick={this.closeModal} href="">CLOSE</a>
        </Modal>
      </div>
    );
  }
}

class LocationSearch extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      value: '',
    };

    // this.handleChange = this.handleChange.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this);
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Enter your location:
          <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

export default SiteList;
