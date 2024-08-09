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
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalImgSrc, setModalImgSrc] = useState("");
    const [modalImgAlt, setModalImgAlt] = useState("");
    
    const handleSearch = async (newDescription) => {
        setDescription(newDescription);
    };

    const handleLoadMore = async () => {
        fetchPhoto();
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
            setLoading(true); 
            try {
                const response = await axios.get(
                    `https://api.unsplash.com/search/photos/?query=${description}&client_id=2iO51974LO3lFXGKiJTOTCo3WzG-IdNTwia3Ehph0`
                );
                setPhotos((prevPhotos) => [...prevPhotos, ...response.data.results]);
            } catch (error) {
                setError(true);
            } finally {
                setLoading(false); 
            }
        }
        fetchPhoto();
    }, [description]);


    return (
        <div className={css.container}>
            <SearchBar onSearch={handleSearch} />
            {error ? <ErrorMessage /> : (photos.length > 0 && <ImageGallery items={photos} onImageClick={handleImageClick} />)}
            {photos.length > 0 && !loading && <LoadMoreBtn onClick={handleLoadMore} />}
            <ImageModal isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)} imgSrc={modalImgSrc} imgAlt={modalImgAlt} />
            <Toaster />
        </div>
    );
}
