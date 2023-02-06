import PropTypes from 'prop-types';

import style from './image-gallery-item.module.css';

function ImageGalleryItem({ src, alt, largeImg, showImg }) {
  return (
    <li onClick={() => showImg(largeImg)} className={style.imageGalleryItem}>
      <img src={src} alt={alt} className={style.imageGalleryItemImage} />
    </li>
  );
}
ImageGalleryItem.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string,
  largeImg: PropTypes.string.isRequired,
  showImg: PropTypes.func.isRequired,
};
export default ImageGalleryItem;
