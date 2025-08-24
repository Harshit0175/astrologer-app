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

    alert("Payment Successful ✅");

    // Success hone ke baad thank you / dashboard pe bhej do
    navigate("/thank-you", {
      state: { astrologer, slot, service, formData },
    });
  };

  if (!astrologer) {
    return <p className="p-6 text-red-500">No payment details found.</p>;
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Payment Page</h2>

      <div className="mb-4">
        <p><strong>Astrologer:</strong> {astrologer.name}</p>
        <p><strong>Service:</strong> {service?.name}</p>
        <p><strong>Slot:</strong> {slot}</p>
        <p><strong>Name:</strong> {formData?.name}</p>
        <p><strong>Email:</strong> {formData?.email}</p>
        <p><strong>Phone:</strong> {formData?.phone}</p>
        <p className="font-semibold mt-2">
          Amount to Pay: ₹{service?.pricePerMin || 0}
        </p>
      </div>

      <button
        onClick={handlePayment}
        className="bg-green-600 text-white px-4 py-2 rounded"
      >
        Pay Now
      </button>
    </div>
  );
}

export default Payment;
