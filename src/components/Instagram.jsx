import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import instaaImg1 from '../assets/images/instagram-img-1.jpg'
import instaaImg2 from '../assets/images/instagram-img-2.jpg'
import instaaImg3 from '../assets/images/instagram-img-3.jpg'
import instaaImg4 from '../assets/images/instagram-img-4.jpg'
import instaaImg5 from '../assets/images/instagram-img-5.jpg'


const Instagram = () => {
    return (
        <div className="instagram carousel-block py-60">
            <div className="container">
                <div className="title-block center pb-40">
                    <h6>Follow Us On Instagram</h6>
                </div>
            </div>
            <Swiper
                spaceBetween={2}
                slidesPerView={1.15}
                loop={true}
                centeredSlides={true}
                breakpoints={{
                    641: { slidesPerView: 4, spaceBetween: 2, centeredSlides:false}
                }}
                className="instagram-slider"
            >
                <SwiperSlide>
                    <div className="image-block">
                        <img className="w-100 cover" width="" height="" src={instaaImg1} alt="" />   
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="image-block">
                        <img className="w-100 cover" width="" height="" src={instaaImg2} alt="" />   
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="image-block">
                        <img className="w-100 cover" width="" height="" src={instaaImg3} alt="" />   
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="image-block">
                        <img className="w-100 cover" width="" height="" src={instaaImg4} alt="" />   
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="image-block">
                        <img className="w-100 cover" width="" height="" src={instaaImg5} alt="" />   
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="image-block">
                        <img className="w-100 cover" width="" height="" src={instaaImg2} alt="" />   
                    </div>
                </SwiperSlide>
            </Swiper>
        </div>
        
    )
}

export default Instagram