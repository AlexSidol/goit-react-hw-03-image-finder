import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import pixabayApi from '../services/pixabay-api';
import ImageGallery from './ImageGallery/ImageGallery';

import Searchbar from '../components/Searchbar/Searchbar.jsx';

class App extends Component {
  state = {
    status: 'idle',
    requestInfo: '',
    page: 1,
    images: [],
  };

  handleFormSearch = newRequest => {
    this.setState({ requestInfo: newRequest, page: 1, images: [] });
  };
  renderImages = () => {
    const { requestInfo, page } = this.state;

    pixabayApi
      .fetchImages(requestInfo, page)
      .then(response =>
        this.setState(prevState => ({
          images: [...prevState.images, ...response.hits],
          page: prevState.page + 1,
        }))
      )
      .catch(error => this.setState({ error, status: 'rejected' }));
  };

  componentDidUpdate(prevProps, prevState) {
    const prevSearch = prevProps.SearchInfo;
    const nextSearch = this.props.SearchInfo;

    if (prevSearch !== nextSearch) {
      // this.setState({ status: 'pending' });
      this.renderImages();
    }
  }

  render() {
    return (
      <div>
        <ToastContainer position="top-center" />
        <Searchbar onSubmit={this.handleFormSearch} />

        <ImageGallery images={this.state.images} />
      </div>
    );
  }
}
export default App;
