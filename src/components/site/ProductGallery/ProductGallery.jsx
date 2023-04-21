import React, { useState, useEffect, useRef } from 'react';
import Swiper from 'react-id-swiper';
import 'swiper/css/swiper.css';
const ProductGallery = ({ list }) => {
  const gallerySwiperRef = useRef(null);
  const thumbnailSwiperRef = useRef(null);
  const gallerySwiperParams = {
    spaceBetween: 10,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  };
  const thumbnailSwiperParams = {
    spaceBetween: 10,
    centeredSlides: true,
    slidesPerView: 'auto',
    touchRatio: 0.2,
    slideToClickedSlide: true,
  };
  useEffect(() => {
    const gallerySwiper = gallerySwiperRef.current.swiper;
    const thumbnailSwiper = thumbnailSwiperRef.current.swiper;
    if (gallerySwiper.controller && thumbnailSwiper.controller) {
      gallerySwiper.controller.control = thumbnailSwiper;
      thumbnailSwiper.controller.control = gallerySwiper;
    }
  }, []);
  return (
    <div style={{ height: '490px', width: '600px' }}>
      <Swiper {...gallerySwiperParams} ref={gallerySwiperRef} containerClass="swiper-container swiper-product">
        {list?.map((item) => (
          <div>
            <img src={`${process.env.REACT_APP_SERVER_URL}/${item?.path}`} />
          </div>
        ))}
      </Swiper>
      <Swiper {...thumbnailSwiperParams} ref={thumbnailSwiperRef} containerClass="swiper-container swiper-thumbs">
        {list?.map((item) => (
          <div>
            <img src={`${process.env.REACT_APP_SERVER_URL}/${item?.path}`} />
          </div>
        ))}
      </Swiper>
    </div>
  );
};
export default ProductGallery;
