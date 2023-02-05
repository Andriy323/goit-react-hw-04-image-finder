import { useState, useEffect } from 'react';
import { Circles } from 'react-loader-spinner';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Modal from './Modal/Modal';
import ImgDetails from './ImgDetails/ImgDetails';
import { getImg } from './shared/shared';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import css from './app.module.css';

const App = () => {
  const [img, setImg] = useState([]);
  const [query, setQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [imgModal, setImgModal] = useState(null);
  const [page, setPage] = useState(1);
  const [loader, setLoader] = useState(false);
  const [showBtn, setShowBtn] = useState(false);
  const PER_PAGE = 12;

  useEffect(() => {
    if (!query) {
      return;
    }
    const fetchImg = async () => {
      setShowBtn(false);
      setLoader(true);

      try {
        const data = await getImg(query, PER_PAGE, page);

        if (data.total && page === 1) {
          toast.success(`Found ${data.totalHits} images`);
        }
        if (!data.total) {
          toast.error('Nothing found. Repeat the search!');
        }
        if (page < data.totalHits / PER_PAGE) {
          setShowBtn(true);
        }

        setImg(prevImg => [...prevImg, ...data.hits]);
      } catch (error) {
        toast.error('Oooops.... Repeat the search!');
      } finally {
        setLoader(false);
        setShowBtn(true);
      }
    };
    fetchImg();
  }, [query, page, PER_PAGE]);

  const onSubmit = data => {
    if (data === query) {
      return toast.warning(`
      You are duplicating the request "${data}"!`);
    }
    setImg([]);
    setPage(1);
    setQuery(data);
  };

  const loadImg = () => {
    setPage(prevState => prevState + 1);
  };

  const showImgModal = imgLarge => {
    setShowModal(true);
    setImgModal(imgLarge);
    document.body.style.overflow = 'hidden';
  };
  const modalClose = () => {
    setShowModal(false);
    setImgModal(null);

    document.body.style.overflow = '';
  };

  return (
    <>
      <Searchbar onSubmitForm={onSubmit} />
      <ImageGallery img={img} showImgModal={showImgModal} />
      {img.length !== 0 && showBtn && <Button onClick={loadImg} />}
      {showModal && (
        <Modal close={modalClose}>
          <ImgDetails urlImg={imgModal} />
        </Modal>
      )}
      <Circles wrapperClass={css.loader} visible={loader} />
      <ToastContainer />
    </>
  );
};

export default App;
