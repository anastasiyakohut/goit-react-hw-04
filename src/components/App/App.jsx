import SearchBar from '../SearchBar/SearchBar';
import ImageGallery from '../ImageGallery/ImageGallery';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import LoadMoreBtn from '../LoadMoreBtn/LoadMoreBtn';
import ImageModal from '../ImageModal/ImageModal';
import { useState, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import axios from 'axios';
import css from './App.module.css';

export default function App() {
    const [photos, setPhotos] = useState([]);
    const [description, setDescription] = useState("");
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false); 
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(999);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalImgSrc, setModalImgSrc] = useState("");
    const [modalImgAlt, setModalImgAlt] = useState("");
    
    const handleSearch = (newDescription) => {
        setPhotos([]);
        setPage(1);
        setDescription(newDescription);
    };

    const handleLoadMore = () => {
        setPage((prevPage) => prevPage + 1);
    };

    const handleImageClick = (imgSrc, imgAlt) => {
        setModalImgSrc(imgSrc);
        setModalImgAlt(imgAlt);
        setIsModalOpen(true);
    };

    useEffect(() => {
        if (description === "") {
            return;
        }
        
        async function fetchPhoto() {
            try {
                setLoading(true); 
                setError(false);
                const response = await axios.get(
                    `https://api.unsplash.com/search/photos/?query=${description}&page=${page}&per_page=16&client_id=2idXO51974LO3lFXGKiJTOTCo3WzG-IdNTwia3Ehph0`
                );
                setTotalPages(response.data.total_pages); 
                setPhotos((prevPhotos) => [...prevPhotos, ...response.data.results]);
            } catch (error) { 
                setError(true);

            } finally {
                setLoading(false); 
            }
        }

        fetchPhoto();
    }, [description, page]); 

    return (
        <div className={css.container}>
            <SearchBar onSearch={handleSearch} />
            {error ? <ErrorMessage /> : (photos.length > 0 && <ImageGallery items={photos} onImageClick={handleImageClick} />)}
            {photos.length > 0 && !loading && page < totalPages && !error && <LoadMoreBtn onClick={handleLoadMore} />}
            {loading && <p className={css.loader}>Loading photos, please wait...</p>}
            {page >= totalPages && <p className={css.lastPage}>THIS IS THE END!</p>}
            <ImageModal 
                isOpen={isModalOpen} 
                onRequestClose={() => setIsModalOpen(false)} 
                imgSrc={modalImgSrc} 
                imgAlt={modalImgAlt} 
            />
            <Toaster />
        </div>
    );
}
