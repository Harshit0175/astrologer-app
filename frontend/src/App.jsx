import React, { useState } from "react";
import {Routes, Route } from "react-router-dom";
import AstrologerLanding from "./landingpage/Astrologerlanding";
import Booking from "./landingpage/booking";
import Payment from "./landingpage/payment";


function App() {
  const [bookingData, setBookingData] = useState({
    selectedAstro: null,
    selectedService: null,
    selectedSlot: null
  });

  return (
    <>
  
      <Routes>
        <Route
          path="/" element={
            <AstrologerLanding setBookingData={setBookingData} />
          }
        />
        <Route
          path="/booking" element={
            <Booking
              selectedAstro={bookingData.selectedAstro}
              selectedService={bookingData.selectedService}
              selectedSlot={bookingData.selectedSlot}
            />
          }
        />
          <Route path="/payment" element={<Payment />} />
      </Routes>
    </>
  );
}

export default App;
