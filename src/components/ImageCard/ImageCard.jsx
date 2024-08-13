import css from './ImageCard.module.css'

export default function ImageCard({ imgSrc, imgAlt, onClick }) {
    return (
        <div className={css.listItem} onClick={onClick}>
            <img src={imgSrc} alt={imgAlt} />
        </div>
    );
}