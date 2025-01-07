import React from "react";

const PaymentForm = () => {
  return (
    <div style={{ backgroundColor: "#fff", padding: "20px", borderRadius: "8px", boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)" }}>
      <h3>Payment</h3>
      <form>
        <label>
          <input type="radio" name="payment" value="credit-card" />
          Credit Card
        </label>
        <label>
          <input type="radio" name="payment" value="paypal" />
          PayPal
        </label>
        {/* Add more payment fields here */}
      </form>
    </div>
  );
};

export default PaymentForm;
