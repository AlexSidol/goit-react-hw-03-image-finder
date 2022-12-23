import React, { Component } from 'react';

class ImageGalleryItem extends Component {
  state = {
    isVisibleModal: false,
  };

  showModal = () => {
    this.setState(({ isVisibleModal }) => ({
      isVisibleModal: !isVisibleModal,
    }));
  };

  render() {
    return (
      <li className="gallery-item">
        <img src="" alt="" onClick={this.showModal} />
        {this.state.isVisibleModal && 'условие открытия модалки'}
      </li>
    );
  }
}

export default ImageGalleryItem;
