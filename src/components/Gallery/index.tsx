import React, { ReactNode, useEffect, useRef } from 'react';
import { Box } from '@chakra-ui/react';

import { Splide, SplideSlide } from '@splidejs/react-splide';
import { Options } from '@splidejs/splide';

import '@splidejs/react-splide/css';

export const Gallery = ({ slides }) => {
  const mainRef = useRef<Splide>();

  const thumbsRef = useRef<Splide>();

  const renderSlides = (): ReactNode[] => {
    return slides.map((slide) => (
      <li className='splide__slide' key={slide.src}>
        <img src={slide.src} alt={slide.src} />
      </li>
    ));
  };

  const mainOptions: Options = {
    type: 'slide',
    pagination: false,
    arrows: false,
    cover: true,
    fixedHeight: '400px',
    width: '100%',
  };

  const thumbsOptions: Options = {
    rewind: true,
    fixedWidth: 50,
    fixedHeight: 50,
    isNavigation: true,
    gap: 5,
    focus: 'center',
    pagination: false,
    cover: true,
    arrows: true,
    dragMinThreshold: {
      mouse: 4,
      touch: 10,
    },
    breakpoints: {
      640: {
        fixedWidth: 66,
        fixedHeight: 38,
      },
    },
  };

  useEffect(() => {
    if (mainRef.current && thumbsRef.current && thumbsRef.current.splide) {
      mainRef.current.sync(thumbsRef.current.splide);
    }
  }, []);

  return (
    <div className='wrapper'>
      <Box>
        <Splide
          options={mainOptions}
          ref={mainRef}
          aria-labelledby='thumbnail-slider-example'
        >
          {renderSlides()}
        </Splide>
      </Box>

      <Box mt={2}>
        <Splide
          options={thumbsOptions}
          ref={thumbsRef}
          aria-label='The carousel with thumbnails. Selecting a thumbnail will change the main carousel'
        >
          {renderSlides()}
        </Splide>
      </Box>
    </div>
  );
};
