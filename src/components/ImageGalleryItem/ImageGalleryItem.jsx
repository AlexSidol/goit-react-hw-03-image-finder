import React, { Component } from 'react';
import Modal from '../Modal/Modal';
import css from './ImageGalleryItem.module.css';

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
    const { src, alt, largeImageURL } = this.props;

    return (
      <li className={css.imageGalleryItem}>
        <img
          className={css.imageGalleryItem__image}
          onClick={this.showModal}
          src={src}
          alt={alt}
        />
        {this.state.isVisibleModal && (
          <Modal onClose={this.showModal} src={largeImageURL} alt={alt} />
        )}
      </li>
    );
  }
}

export default ImageGalleryItem;
