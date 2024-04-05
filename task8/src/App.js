import React, { useState, useEffect } from 'react';
import axios from 'axios';
import LazyLoad from 'react-lazyload';
import './App.css';
import Timing from "./Time";

function App() {
  const [images, setImages] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const measurePageLoadTime = () => {
      const pageLoadTime = window.performance.timing.loadEventEnd - window.performance.timing.navigationStart;
      console.log('Page load time:', pageLoadTime);
    };

    measurePageLoadTime();
  }, []);


  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get('https://api.unsplash.com/photos', {
          params: {
            client_id: 'W9-Nf82cE_M0x52E1cHX60MlkNkZ0ioEHBQN8Q9hNc4',
            per_page: 24
          }
        });
        setImages(response.data);
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };

    fetchImages();
  }, []);

  return (
      <div className="App">
        <h1>Image Gallery</h1>


        <div className="image-grid">
          {images.map(image => (
              <LazyLoad key={image.id}>
                <img className={"image_rid"} src={image.urls.regular} alt={image.alt_description} />
              </LazyLoad>
          ))}
        </div>
        <button className={"button"} onClick={openModal}>Show Analysis</button>
        <Timing isOpen={isModalOpen} onRequestClose={closeModal} />

      </div>
  );
}

export default App;
