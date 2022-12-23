import React, { Component } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
    this.reset(() => this.setState({ searchInfo: '' }));
  };

  render() {
    return (
      <header className="searchbar">
        <form className="form">
          <button type="submit" className="button">
            <span className="button-label">Search</span>
          </button>

          <input
            value={this.state.searchInfo}
            onChange={this.handleSearchInfoChange}
            className="input"
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
