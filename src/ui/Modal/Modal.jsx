import { createContext } from 'react';
import { cloneElement, useContext, useState } from 'react';
import { createPortal } from 'react-dom';
import { useOutsideClick } from '../../hooks/useOutsideClick';
import close_icon from '../../assets/close_icon.svg';
import styles from './Modal.module.css';

const ModalContext = createContext();

function Modal({ children }) {
  const [openName, setOpenName] = useState('');

  const close = () => setOpenName('');
  const open = setOpenName;

  return (
    <ModalContext.Provider value={{ openName, close, open }}>
      {children}
    </ModalContext.Provider>
  );
}

function Open({ children, opens: opensWindowName }) {
  const { open } = useContext(ModalContext);
  return cloneElement(children, {
    onClick: () => open(opensWindowName),
  });
}

function Window({ children, name }) {
  const { openName, close } = useContext(ModalContext);
  const ref = useOutsideClick(close);

  if (name !== openName) return null;

  return createPortal(
    <div className={styles.overlay}>
      <div className={styles.modal} ref={ref}>
        <button className={styles.close_btn} onClick={close}>
          <img src={close_icon} alt="close" />
        </button>
        <div>
          {cloneElement(children, { ...children.props, onCloseModal: close })}
        </div>
      </div>
    </div>,
    document.body
  );
}

Modal.Open = Open;
Modal.Window = Window;

export default Modal;
