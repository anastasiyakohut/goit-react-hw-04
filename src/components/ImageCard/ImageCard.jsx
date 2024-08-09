import css from './ImageCard.module.css'

export default function ImageCard({item}) { 
    return (
        <li className={css.listItem}>
            <div key={item.id}>
                <img src={item.urls.small} alt={item.description} />
            </div>
        </li>
    )
}