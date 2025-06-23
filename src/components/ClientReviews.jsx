import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import clientReview1 from '../assets/images/client-review-img-1.jpg'
import clientReview2 from '../assets/images/client-review-img-2.jpg'
import review1 from '../assets/images/review-1.png'
import review2 from '../assets/images/review-2.png'

const ClientReviews = () => {
    return (
        <div className="client-reviews-block m-pt-80 py-100">            
            <div className="container">
                <div className="title-block sm-pb-10 pb-30">
                    <h6>From Our Clients</h6>
                </div>
            </div>    
            <div className="client-reviews-slider">
                <Swiper
                    spaceBetween={8}
                    slidesPerView={1.1}                
                    loop={true}
                    breakpoints={{
                        641: { slidesPerView: 2.3, spaceBetween: 10 },
                        1025: { slidesPerView: 3.3, spaceBetween: 10 }
                    }}                    
                >
                    <SwiperSlide>
                        <div className="review-block">
                            <div className="image-block pb-30">
                                <img className="w-100 cover" width="" height="" src={clientReview1} alt="" />
                            </div>
                            <div className="summary-block px-10">
                                <div className="text-block">
                                    <p>“Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.“</p>                            
                                </div>
                                <div className="meta-block d-flex align-center gap-20">
                                    <div className="image-block">
                                        <img width="" height="" className='cover' src={review1} alt="" />
                                    </div>
                                    <div className="title-block h6">Design & Build Project</div>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="review-block">
                            <div className="image-block pb-30">
                                <img className="w-100 cover" width="" height="" src={clientReview2} alt="" />
                            </div>
                            <div className="summary-block px-10">
                                <div className="text-block">
                                    <p>“Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.“</p>                            
                                </div>
                                <div className="meta-block d-flex align-center gap-20">
                                    <div className="image-block">
                                        <img className="w-100 cover" width="" height="" src={review2} alt="" />
                                    </div>
                                    <div className="title-block h6">Design & Build Project</div>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="review-block">
                            <div className="image-block pb-30">
                                <img className="w-100 cover" width="" height="" src={clientReview1} alt="" />
                            </div>
                            <div className="summary-block px-10">
                                <div className="text-block">
                                    <p>“Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.“</p>                            
                                </div>
                                <div className="meta-block d-flex align-center gap-20">
                                    <div className="image-block">
                                        <img width="" height="" className='cover' src={review1} alt="" />
                                    </div>
                                    <div className="title-block h6">Design & Build Project</div>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="review-block">
                            <div className="image-block pb-30">
                                <img className="w-100 cover" width="" height="" src={clientReview2} alt="" />
                            </div>
                            <div className="summary-block px-10">
                                <div className="text-block">
                                    <p>“Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.“</p>                            
                                </div>
                                <div className="meta-block d-flex align-center gap-20">
                                    <div className="image-block">
                                        <img width="" height="" className='cover' src={review2} alt="" />
                                    </div>
                                    <div className="title-block h6">Design & Build Project</div>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                </Swiper>
            </div>            
        </div>
    )
}

export default ClientReviews
