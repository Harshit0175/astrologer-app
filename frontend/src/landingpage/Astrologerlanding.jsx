// src/pages/LandingPage/AstrologerLanding.jsx
import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import ServiceCard from "./components/Servicecard";
import SlotButton from "./components/SlotButton";
import Booking from "./booking";
import { useNavigate } from "react-router-dom";

const AstrologerLanding = () => {
  const [astrologers, setAstrologers] = useState([]);
  const [selectedAstro, setSelectedAstro] = useState(null);
  const [selectedService, setSelectedService] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const navigate = useNavigate();

  // Dummy services & slots for each astrologer
  const dummyServices = [
    { id: 1, name: "Tarot Reading", pricePerMin: 12, discountPrice: 10 },
    { id: 2, name: "Fortune Telling", pricePerMin: 15, discountPrice: 12 },
    { id: 3, name: "Astrology Consultation", pricePerMin: 20, discountPrice: 18 },
  ];
  const dummySlots = ["10:00 AM", "12:00 PM", "2:00 PM", "4:00 PM"];

  // Fetch astrologers from backend
  useEffect(() => {
    const fetchAstrologers = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/astrologers");
        const data = await res.json();
        // Add dummy services & slots for now
        const withExtras = data.map((a) => ({
          ...a,
          services: dummyServices,
          slots: dummySlots,
        }));
        setAstrologers(withExtras);
      } catch (err) {
        console.error(err);
      }
    };
    fetchAstrologers();
  }, []);

  const handleAstroSelect = (astro) => {
    setSelectedAstro(astro);
    setSelectedService(null);
    setSelectedSlot(null);
  };

  const handleServiceSelect = (service) => setSelectedService(service);
  const handleSlotSelect = (slot) => setSelectedSlot(slot);

  return (
    <div className="p-6 min-h-screen bg-gradient-to-br from-gray-100 to-gray-200">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 text-center">
         Choose an Astrologer
      </h1>

      {/* Astrologer Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {astrologers.map((astro) => (
          <div
            key={astro._id}
            className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition cursor-pointer"
            onClick={() => handleAstroSelect(astro)}
          >
            <div className="flex items-center space-x-4">
              <img
                src={astro.image}
                alt={astro.name}
                className="w-20 h-20 rounded-full border-4 border-purple-200 shadow"
              />
              <div>
                <h2 className="font-bold text-lg text-gray-800">{astro.name}</h2>
                <p className="text-sm text-gray-600">{astro.experience}</p>
                <p className="text-sm text-gray-600">{astro.skills?.join(", ")}</p>
              </div>
            </div>
            <div className="mt-4 text-gray-700">
              <p> Rating: {astro.rating} ({astro.reviewsCount} reviews)</p>
              <p> Price per Minute: ₹{astro.pricePerMin}</p>
              <p
                className={`font-semibold ${
                  astro.status === "online" ? "text-green-600" : "text-gray-500"
                }`}
              >
                {astro.status}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Selected Astrologer Details */}
      {selectedAstro && (
        <div className="border-t pt-6">
          <Header astrologer={selectedAstro} />

          {/* Services */}
          <h2 className="text-2xl font-bold mb-4 text-gray-800">🛠 Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {selectedAstro.services.map((s) => (
              <ServiceCard key={s.id} service={s} onSelect={handleServiceSelect} />
            ))}
          </div>

          {/* Slots */}
          {selectedService && (
            <>
              <h2 className="text-2xl font-bold mt-6 mb-2 text-gray-800">
                 Select Slot for {selectedService.name}
              </h2>
              <div className="flex flex-wrap gap-3">
                {selectedAstro.slots.map((slot) => (
                  <SlotButton key={slot} slot={slot} onClick={handleSlotSelect} />
                ))}
              </div>
            </>
          )}

          {/* Selected Service & Slot */}
          {selectedSlot && (
            <div className="mt-6 p-5 bg-green-100 border border-green-300 rounded-xl shadow-md">
              <p className="text-gray-800">
                Selected Service: <strong>{selectedService.name}</strong>
              </p>
              <p className="text-gray-800">
                Selected Slot: <strong>{selectedSlot}</strong>
              </p>
              <button
                className="mt-4 bg-gradient-to-r from-purple-500 to-indigo-600 text-white px-6 py-3 rounded-xl font-semibold shadow hover:scale-105 transform transition"
                onClick={() => {
                  navigate("/booking", {
                    state: {
                      astrologer: selectedAstro,
                      service: selectedService,
                      slot: selectedSlot,
                    },
                  });
                }}
              >
                 Proceed to Payment
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AstrologerLanding;
