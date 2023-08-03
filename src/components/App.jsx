import React, { Component } from 'react';
import css from './app.module.css';
import { Searchbar } from './searchbar/Searchbar';
import { ImageGallery } from './imageGallery/ImageGallery';
import { apiRequest } from './api';
import { Button } from './button/Button';
import { Loader } from './loader/Loader';
import { Modal } from './modal/Modal';

export class App extends Component {
  state = {
    query: '',
    cards: [],
    error: null,
    status: 'idle',
    currentPage: 1,
    loadMore: false,
    modal: false,
    modalImg: '',
  };

  componentDidUpdate(prevProps, prevState) {
    const { query, currentPage } = this.state;
    if (currentPage !== prevState.currentPage || query !== prevState.query) {
      this.setState({ status: 'pending' });

      apiRequest(query, currentPage)
        .then(response => {
          this.setState({
            cards:
              query !== prevState.query
                ? response.hits
                : [...prevState.cards, ...response.hits],
            status: 'resolved',
            loadMore:
              this.state.currentPage < Math.ceil(response.totalHits / 12),
          });
        })
        .catch(error => this.setState({ error, status: 'rejected' }));
    }
  }

  loadMoreFn = () => {
    const { currentPage } = this.state;
    this.setState({
      currentPage: currentPage + 1,
    });
  };

  onSubmit = value => {
    this.setState({
      query: value,
    });
  };

  onCardClick = img => {
    this.setState({ modal: true, modalImg: img });
  };
  closeModal = () => {
    this.setState({ modal: false });
  };

  render() {
    return (
      <div className={css.app}>
        <Searchbar onSubmit={this.onSubmit} />
        <ImageGallery
          cards={this.state.cards}
          status={this.state.status}
          onCardClick={this.onCardClick}
        />
        {this.state.status === 'pending' && <Loader />}
        {this.state.status === 'resolved' && this.state.loadMore && (
          <Button loadMoreFn={this.loadMoreFn}></Button>
        )}
        {this.state.modal && (
          <Modal modalImg={this.state.modalImg} closeModal={this.closeModal} />
        )}
      </div>
    );
  }
}
