// src/pages/LandingPage/AstrologerLanding.jsx
import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import ServiceCard from "./components/Servicecard";
import SlotButton from "./components/SlotButton";
import { useNavigate } from "react-router-dom";

const AstrologerLanding = () => {
  const [astrologers, setAstrologers] = useState([]);
  const [selectedAstro, setSelectedAstro] = useState(null);
  const [selectedService, setSelectedService] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const navigate = useNavigate();

  // Dummy services & slots for each astrologer
  const dummyServices = [
    { id: 2, name: ["tarot reading" ,"   fortune telling"], description: "Glimpse into your destiny with our expert fortune tellers.", pricePerMin: 15, discountPrice: 12 },
    { id: 3, name: ["palmistry", "   numerology"], description: "Personalized astrology readings based on your birth chart.", pricePerMin: 20, discountPrice: 18 },
    { id: 1, name: ["vedic astrology", "   kp astrology"], description: "A deep dive into your past, present, and future.", pricePerMin: 12, discountPrice: 10 },
  ];
  const dummySlots = ["10:00 AM", "12:00 PM", "2:00 PM", "4:00 PM"];


  // Fetch astrologers from backend
  useEffect(() => {
    const fetchAstrologers = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/astrologers");
        const data = await res.json();
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
    <div className="p-6 min-h-screen bg-gradient-to-b from-purple-100 via-pink-100 to-yellow-50">
      <h1 className="text-4xl font-extrabold mb-10 text-center text-purple-800 drop-shadow-sm">
         Choose Your Astrologer
      </h1>

      {/* Astrologer Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        {astrologers.map((astro) => (
          <div
            key={astro._id}
            onClick={() => handleAstroSelect(astro)}
            className={`p-6 rounded-2xl shadow-lg cursor-pointer transition-all transform hover:scale-105 hover:shadow-2xl ${
              selectedAstro?._id === astro._id ? "ring-4 ring-purple-400" : "bg-white"
            }`}
          >
            <div className="flex items-center space-x-4">
              <img
                src={astro.image}
                alt={astro.name}
                className="w-20 h-20 rounded-full border-4 border-purple-200 shadow-md"
              />
              <div>
                <h2 className="text-xl font-bold text-gray-800">{astro.name}</h2>
                <p className="text-sm text-gray-600">{astro.experience}</p>
                <p className="text-sm text-gray-600">{astro.skills?.join(", ")}</p>
              </div>
            </div>
            <div className="mt-4 text-gray-700 space-y-1">
              <p> Rating: {astro.rating} ({astro.reviewsCount} reviews)</p>
              <p> Price per Minute: ₹{astro.pricePerMin}</p>
              <p
                className={`font-semibold ${
                  astro.status === "online" ? "text-green-600" : "text-gray-500"
                }`}
              >
                {astro.status === "online" ? "🟢 Online" : "⚪ Offline"}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Selected Astrologer Details */}
      {selectedAstro && (
        <div className="bg-white rounded-2xl shadow-xl p-8 border-t-4 border-purple-400">
          <Header astrologer={selectedAstro} />

          {/* Services */}
          <h2 className="text-2xl font-bold mt-6 mb-4 text-gray-800">
             Available Services
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {selectedAstro.services.map((s) => (
              <ServiceCard key={s.id} service={s} onSelect={handleServiceSelect} />
            ))}
          </div>

          {/* Slots */}
          {selectedService && (
            <>
              <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-800">
                Select Slot for <span className="text-purple-600">{selectedService.name}</span>
              </h2>
              <div className="flex flex-wrap gap-4">
                {selectedAstro.slots.map((slot) => (
                  <SlotButton key={slot} slot={slot} onClick={handleSlotSelect} />
                ))}
              </div>
            </>
          )}

          {/* Selected Service & Slot */}
          {selectedSlot && (
            <div className="mt-8 p-6 bg-gradient-to-r from-green-100 via-green-50 to-green-100 border border-green-300 rounded-xl shadow-md text-center">
              <p className="text-lg text-gray-800">
                 Selected Service: <strong className="text-purple-700">{selectedService.name}</strong>
              </p>
              <p className="text-lg text-gray-800 mt-2">
                 Selected Slot: <strong className="text-purple-700">{selectedSlot}</strong>
              </p>
              <button
                onClick={() => {
                  navigate("/booking", {
                    state: {
                      astrologer: selectedAstro,
                      service: selectedService,
                      slot: selectedSlot,
                    },
                  });
                }}
                className="mt-6 bg-gradient-to-r from-purple-500 to-indigo-600 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:scale-105 transform transition"
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
