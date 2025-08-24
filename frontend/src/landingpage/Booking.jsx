import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

function Booking() {
  const location = useLocation();
  const navigate = useNavigate();

  const { astrologer, slot, service } = location.state || {};

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleConfirm = () => {
    if (!formData.name || !formData.email || !formData.phone) {
      alert("Please fill all details!");
      return;
    }

    console.log("Booking Confirmed:", {
      astrologer,
      slot,
      service,
      ...formData,
    });

    navigate("/payment", {
      state: { astrologer, slot, service, formData },
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 via-pink-50 to-white p-6">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-lg border border-gray-100">
        
        {/* Heading */}
        <h2 className="text-3xl font-bold mb-6 text-center text-purple-700">
          Confirm Your Booking
        </h2>

        {/* Astrologer & Service Details */}
        {astrologer ? (
          <div className="mb-6 bg-purple-50 p-4 rounded-lg border border-purple-200">
            <p className="text-gray-700"><strong>Astrologer:</strong> {astrologer.name}</p>
            <p className="text-gray-700"><strong>Service:</strong> {service?.name}</p>
            <p className="text-gray-700"><strong>Slot:</strong> {slot}</p>
          </div>
        ) : (
          <p className="text-red-500 text-center mb-4">No booking details found.</p>
        )}

        {/* User Details Form */}
        <h3 className="text-xl font-semibold mb-3 text-gray-800">Your Details</h3>
        <div className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            className="block w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-purple-500 focus:outline-none"
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            className="block w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-purple-500 focus:outline-none"
          />
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            className="block w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-purple-500 focus:outline-none"
          />
        </div>

        {/* Confirm Button */}
        <button
          onClick={handleConfirm}
          className="w-full mt-6 bg-purple-600 text-white text-lg font-semibold py-3 rounded-xl hover:bg-purple-700 transition duration-200 shadow-md"
        >
          Confirm & Proceed to Payment
        </button>
      </div>
    </div>
  );
}

export default Booking;
