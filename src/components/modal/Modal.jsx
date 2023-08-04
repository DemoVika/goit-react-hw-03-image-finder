import css from './modal.module.css';
import React, { Component } from 'react';

export class Modal extends Component {
  handleKeyDown = event => {
    console.log(event);
    if (event.code === 'Escape') {
      this.props.closeModal();
    }
  };

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  onClickOverlay = event => {
    if (event.target === event.currentTarget) {
      this.props.closeModal();
    }
  };

  render() {
    return (
      <div className={css.overlay} onClick={this.onClickOverlay}>
        <div className={css.modal}>
          <img src={this.props.modalImg} alt="big" />
        </div>
      </div>
    );
  }
}
