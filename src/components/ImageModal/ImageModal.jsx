import Modal from 'react-modal';
import css from './ImageModal.module.css';

export default function ImageModal({ isOpen, onRequestClose, imgSrc, imgAlt }) {
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            className={css.modal}
            overlayClassName={css.overlay}
        >
            <img src={imgSrc} alt={imgAlt} className={css.image} />
        </Modal>
    );
}
