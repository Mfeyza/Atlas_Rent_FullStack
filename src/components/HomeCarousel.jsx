import React, { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import { Container, Typography } from '@mui/material';

function ControlledCarousel() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return (
    
      <Carousel className="carousel-container " activeIndex={index} onSelect={handleSelect} >
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://www.introducingibiza.com/f/espana/ibiza/guia/coche-alquiler.jpg"
            alt="First slide"
          />
        
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://miro.medium.com/v2/resize:fit:1358/0*zqvwKA9pHUnLlnFK.png"
            alt="Second slide"
          />
        
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://www.adobecar.com/wp-content/uploads/2017/06/deliver-hotel-1.jpg"
            alt="Third slide"
          />
          
        </Carousel.Item>
      </Carousel>
   
  );
}

export default ControlledCarousel;
