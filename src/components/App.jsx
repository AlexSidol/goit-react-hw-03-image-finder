import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import pixabayApi from '../services/pixabay-api';
import ImageGallery from './ImageGallery/ImageGallery';
import filteredArr from '../services/filteredArr';
import Searchbar from '../components/Searchbar/Searchbar.jsx';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import css from '../components/App.module.css';

class App extends Component {
  state = {
    status: 'idle',
    requestInfo: '',
    page: 1,
    images: [],
    error: null,
    showButton: false,
  };

  handleFormSearch = newRequest => {
    this.setState({ requestInfo: newRequest, page: 1, images: [] });
  };

  renderImages = () => {
    const { requestInfo, page } = this.state;
    const perPage = 12;
    pixabayApi
      .fetchImages(requestInfo, page)
      .then(response => {
        // console.log(response.hits);
        if (response.hits.length === 0) {
          toast.info(' No results for your request, try again ');
          this.setState({ status: 'resolved', showButton: false });
          return;
        }

        const normalizedData = filteredArr(response.hits);

        return this.setState(prevState => ({
          images: [...prevState.images, ...normalizedData],
          status: 'resolved',
          page: prevState.page + 1,
          showButton: page < Math.ceil(response.totalHits / perPage),
        }));
      })
      .catch(error => this.setState({ error, status: 'rejected' }));
  };

  componentDidUpdate(prevProps, prevState) {
    const prevSearch = prevState.requestInfo;
    const nextSearch = this.state.requestInfo;

    if (prevSearch !== nextSearch) {
      this.setState({ status: 'pending' });
      this.renderImages();
    }
  }

  render() {
    const { status, showButton } = this.state;
    return (
      <div className={css.app}>
        <ToastContainer position="top-center" />
        <Searchbar onSubmit={this.handleFormSearch} />

        {status === 'idle' && (
          <p className={css.text__inform}>
            Application for searching images and photos
          </p>
        )}

        {status === 'rejected' && <p>Sorry, try again late</p>}

        {status === 'resolved' && (
          <div>
            <ImageGallery images={this.state.images} />
            {showButton && <Button onClick={this.renderImages} />}
          </div>
        )}

        {status === 'pending' && <Loader />}
      </div>
    );
  }
}

export default App;
