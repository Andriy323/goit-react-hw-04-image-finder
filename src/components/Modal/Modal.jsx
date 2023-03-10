import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

import css from 'components/Modal/modal.module.css';

const modalRoot = document.querySelector('#modal-root');
const Modal = ({ close, children }) => {
  const modalClose = ({ target, currentTarget, code }) => {
    if (target === currentTarget || code === 'Escape') {
      close();
    }
  };
  useEffect(() => {
    document.addEventListener('keydown', modalClose);
    return () => {
      document.removeEventListener('keydown', modalClose);
    };
  });

  return createPortal(
    <div className={css.overlay} onClick={modalClose}>
      <div className={css.modal}>{children}</div>
    </div>,
    modalRoot
  );
};

export default Modal;
Modal.propTypes = {
  children: PropTypes.element.isRequired,
};
