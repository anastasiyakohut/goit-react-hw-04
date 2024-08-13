import Modal from 'react-modal';
import css from './ImageModal.module.css';

Modal.setAppElement('#root'); 

export default function ImageModal({ isOpen, onRequestClose, imgSrc, imgAlt}) {
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            className={css.modal}
            overlayClassName={css.overlay}
        >
            <div className={css.content}>
                <img src={imgSrc} alt={imgAlt} className={css.image} />
            </div>
        </Modal>
    );
}
