// src/pages/LandingPage/components/Header.jsx
import React from "react";

const Header = ({ astrologer }) => {
  return (
    <div className="flex items-center gap-4 mb-4">
      <img
        src={astrologer.image}
        alt={astrologer.name}
        className="w-20 h-20 rounded-full"
      />
      <div>
        <h2 className="text-xl font-bold">{astrologer.name}</h2>
        <p>{astrologer.experience}</p>
        <p>{astrologer.skills?.join(", ")}</p>
        <p>Rating: {astrologer.rating} ({astrologer.reviewsCount} reviews)</p>
        <p className={`font-semibold ${astrologer.status === "online" ? "text-green-600" : "text-gray-500"}`}>
          {astrologer.status}
        </p>
      </div>
    </div>
  );
};

export default Header;
