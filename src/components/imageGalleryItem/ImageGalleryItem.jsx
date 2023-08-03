import css from './imageGalleryItem.module.css';

export const ImageGalleryItem = ({ webformatURL, onCardClick, largeImage }) => {
  return (
    <li
      className={css.imageGalleryItem}
      onClick={() => {
        onCardClick(largeImage);
      }}
    >
      <img
        className={css.mageGalleryItemImage}
        src={webformatURL}
        alt="small"
      />
    </li>
  );
};
