import React from 'react';
import service1 from '../assets/images/development.jpg'
import service2 from '../assets/images/interiorDesign.jpg'
import service3 from '../assets/images/Architecture.jpg'
import service4 from '../assets/images/ProjectManagement.jpg'
import service5 from '../assets/images/PropertySearch.jpg'
import service6 from '../assets/images/Sales.jpg'
import service7 from '../assets/images/InvestmentManagement.jpg'

const services = [
  {
    title: 'DEVELOPMENT',
    description: 'From land acquisition to final delivery, we turn your vision into reality.',
    image: service1,
  },
  {
    title: 'INTERIOR DESIGN',
    description: 'Elegant, comfortable interiors that reflect refined living.',
    image: service2,
  },
  {
    title: 'ARCHITECTURE',
    description: 'Distinctive designs tailored to your personal style and way of life.',
    image: service3,
  },
  {
    title: 'PROJECT MANAGEMENT',
    description: 'A single point of contact ensures clear communication, timely delivery, and budget control.',
    image: service4,
  },
  {
    title: 'PROPERTY SEARCH',
    description: 'We identify prime plots and properties with the ideal potential.',
    image: service5,
  },
  {
    title: 'SALES',
    description: 'Strategic marketing and sales to achieve optimal market value.',
    image: service6,
  },
  {
    title: 'INVESTMENT MANAGEMENT',
    description: 'Expert advice to maximize returns and support smart real estate decisions.',
    image: service7,
  },
];

const PropertyCard = () => {
  return (
    <div className="properties-block pt-70 pb-70 sm-py-120">
      <div className="container">
        <div className="title-block pb-30 sm-pb-50">
          <h2>Services seamlessly integrated under one roof to manage every detail</h2>
        </div>

        <div className="property-blocks d-grid d-column-2">
          {services.map((service, index) => (
            <div className="property-block d-flex gap-20 align-start" key={index}>
              <div className="image-block circle-radius overflow-hidden">
                <img
                  className="cover"
                  src={service.image}
                  alt={service.title}
                  width="75"
                  height="75"
                  style={{ borderRadius: '50%', objectFit: 'cover' }}
                />
              </div>
              <div className="summary-block">
                <h6 className="uppercase mb-10">{service.title}</h6>
                <p className="text-gray mb-0">{service.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
