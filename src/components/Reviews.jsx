import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import review1 from '../assets/images/review-1.png'
import review2 from '../assets/images/review-2.png'
import config from '../config';

const Reviews = ({reviews, getTranslatedText}) => {
    return(
        <div className="reviews-block pt-70 pb-50 sm-py-120">
            <div className="container">
                <div className="title-block pb-40">
                    <h6>{getTranslatedText("Reviews")}</h6>
                </div>
            </div>
            <Swiper
                spaceBetween={0}
                slidesPerView={1}
                loop={true}
                breakpoints={{
                    769: { slidesPerView: 1.5, spaceBetween: 60, slidesOffsetBefore: 70},
                    1025: { slidesPerView: 2.3, spaceBetween: 100, slidesOffsetBefore: 80}
                }}
                className="review-slider"
            >
                {reviews && reviews.length > 0 && reviews.map((item, key) => (
                    <SwiperSlide>
                        <div className="review-block d-flex gap-20">
                            <div className="image-block circle-radius overflow-hidden">
                                <img className="cover" width="" height="" src={config?.BASE_URL + item?.featuredImage} alt="" />
                            </div>
                            <div className="summary-block">
                                <h2>“{item?.title}”</h2>
                                <p>{item?.description}</p>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    )
}

export default Reviews
