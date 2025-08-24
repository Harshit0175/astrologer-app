// src/pages/LandingPage/components/ServiceCard.jsx
import React from "react";

const ServiceCard = ({ service, onSelect }) => {
  return (
    <div
      className="p-4 border rounded hover:shadow cursor-pointer"
      onClick={() => onSelect(service)}
    >
      <h3 className="font-bold text-lg">{service.name}</h3>
      <p>Price per Minute: ₹{service.pricePerMin}</p>
      {service.discountPrice && <p>Discount: ₹{service.discountPrice}</p>}
    </div>
  );
};

export default ServiceCard;
