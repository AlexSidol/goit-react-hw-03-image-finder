import React, { Component } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import css from './Searchbar.module.css';

class Searchbar extends Component {
  state = {
    searchInfo: '',
  };

  handleSearchInfoChange = evt => {
    this.setState({ searchInfo: evt.currentTarget.value.toLowerCase() });
  };

  handleSearchInfoSubmit = evt => {
    evt.preventDefault();
    const { searchInfo } = this.state;

    if (searchInfo.trim() === '') {
      toast.info('Enter your request...');
      return;
    }
    this.props.onSubmit(searchInfo);
    // this.setState({ searchInfo: '' });
  };

  render() {
    return (
      <header className={css.searchbar}>
        <form className={css.searchForm} onSubmit={this.handleSearchInfoSubmit}>
          <button type="submit" className={css.searchForm__button}>
            <span className={css.searchForm__label}>Search</span>
          </button>

          <input
            value={this.state.searchInfo}
            onChange={this.handleSearchInfoChange}
            className={css.searchForm__input}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}

export default Searchbar;
