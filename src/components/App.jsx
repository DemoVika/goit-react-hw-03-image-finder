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
          this.setState(prevState => {
            return {
              cards: [...prevState.cards, ...response.hits],
              status: 'resolved',
              loadMore:
                this.state.currentPage < Math.ceil(response.totalHits / 12),
            };
          });
        })
        .catch(error => this.setState({ error, status: 'rejected' }));
    }
  }

  loadMoreFn = () => {
    this.setState(prevState => {
      return { currentPage: prevState.currentPage + 1 };
    });
  };

  onSubmit = value => {
    this.setState({
      query: value,
      cards: [],
      currentPage: 1,
    });
  };

  onCardClick = img => {
    this.setState({ modal: true, modalImg: img });
  };
  closeModal = () => {
    this.setState({ modal: false });
  };

  galleryRender = () => {
    const { status, cards } = this.state;
    if (status === 'idle') {
      return <div>Введите тему</div>;
    }

    if (status === 'rejected') {
      return <div>Ошибка</div>;
    }

    if (status === 'resolved' || status === 'pending') {
      return <ImageGallery cards={cards} onCardClick={this.onCardClick} />;
    }
  };

  render() {
    return (
      <div className={css.app}>
        <Searchbar onSubmit={this.onSubmit} />
        {this.galleryRender()}
        {/* <ImageGallery
          cards={this.state.cards}
          // status={this.state.status}
          onCardClick={this.onCardClick}
        /> */}
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
