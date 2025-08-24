// src/pages/LandingPage/components/SlotButton.jsx
import React from "react";

const SlotButton = ({ slot, onClick }) => {
  return (
    <button
      className="m-1 px-3 py-1 border rounded hover:bg-blue-500 hover:text-white"
      onClick={() => onClick(slot)}
    >
      {slot}
    </button>
  );
};

export default SlotButton;
