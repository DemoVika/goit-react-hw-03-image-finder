import React, { Component } from 'react';
import css from './imageGallery.module.css';
import { ImageGalleryItem } from 'components/imageGalleryItem/ImageGalleryItem';

export class ImageGallery extends Component {
  render() {
    const { status, cards } = this.props;
    if (status === 'idle') {
      return <div>Введите тему</div>;
    }

    if (status === 'pending') {
      return <div>Загружаем...</div>;
    }

    if (status === 'rejected') {
      return <div>Ошибка</div>;
    }

    if (status === 'resolved' || status === 'pending')
      return (
        <ul className={css.imageGallery}>
          {cards.map(card => {
            return (
              <div>
                <ImageGalleryItem
                  key={card.id}
                  webformatURL={card.webformatURL}
                  onCardClick={this.props.onCardClick}
                  largeImage={card.largeImageURL}
                />
              </div>
            );
          })}
        </ul>
      );
  }
}
