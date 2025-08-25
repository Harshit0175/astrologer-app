import { useLocation, useNavigate } from "react-router-dom";


function Payment() {
  const location = useLocation();
  const navigate = useNavigate();

  // Booking se aaya data
  const { astrologer, slot, service, formData } = location.state || {};

  const handlePayment = () => {
    // Future me yaha Razorpay / Stripe call karenge
    console.log("Processing Payment for:", {
      astrologer,
      slot,
      service,
      formData,
    });

   alert("Payment Successful ");

    // Success hone ke baad thank you / dashboard pe bhej do
    navigate("/razorpay", {
      state: { astrologer, slot, service, formData },
    });
  };

  if (!astrologer) {
    return (
      <p className="p-6 text-center text-red-500 text-lg font-semibold">
        No payment details found.
      </p>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 to-pink-100">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6 text-purple-700">
          Payment Summary
        </h2>

        <div className="space-y-3 text-gray-700">
          <p>
            <strong>Astrologer:</strong> {astrologer.name}
          </p>
          <p>
            <strong>Service:</strong> {service?.name}
          </p>
          <p>
            <strong>Slot:</strong> {slot}
          </p>
          <p>
            <strong>Name:</strong> {formData?.name}
          </p>
          <p>
            <strong>Email:</strong> {formData?.email}
          </p>
          <p>
            <strong>Phone:</strong> {formData?.phone}
          </p>
          <p className="font-semibold text-lg text-green-600">
            Amount to Pay: ₹{service?.pricePerMin || 0}
          </p>
        </div>

        <button
          onClick={handlePayment}
          className="w-full mt-6 bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 rounded-lg transition duration-300 shadow-md"
        >
          Pay Now
        </button>
      </div>
    </div>
  );
}

export default Payment;
