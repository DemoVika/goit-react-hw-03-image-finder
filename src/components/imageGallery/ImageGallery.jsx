import React, { Component } from 'react';
import css from './imageGallery.module.css';
import { ImageGalleryItem } from 'components/imageGalleryItem/ImageGalleryItem';

export class ImageGallery extends Component {
  render() {
    return (
      <ul className={css.imageGallery}>
        {this.props.cards.map(card => {
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
