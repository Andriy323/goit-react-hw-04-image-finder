import ImageGalleryItem from './ImageGalleryItem/ImageGalleryItem';
import PropTypes from 'prop-types';
import style from '../ImageGallery/imageGallery.module.css';

const ImageGallery = ({ showImgModal, img }) => {
  const showImg = img => {
    showImgModal(img);
  };

  return (
    <ul className={style.imageGallery}>
      {img.map(({ webformatURL, largeImageURL, tags }) => (
        <ImageGalleryItem
          key={largeImageURL}
          src={webformatURL}
          alt={tags}
          showImg={showImg}
          largeImg={largeImageURL}
        />
      ))}
    </ul>
  );
};

ImageGallery.propTypes = {
  showImgModal: PropTypes.func.isRequired,
};

export default ImageGallery;
