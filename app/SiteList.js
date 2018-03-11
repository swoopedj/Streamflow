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
        <li key={site.site_id} onClick={() => this.openModal(index)}>
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

export default SiteList;
