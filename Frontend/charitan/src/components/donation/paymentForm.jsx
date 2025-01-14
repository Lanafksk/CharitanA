import React, { useState } from "react";
import {
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  TextField,
  Button,
  Typography,
  Box,
} from "@mui/material";
import { fetchPayment } from "../../utils/api/payment/donationPayment";

const PaymentForm = ({ projectData }) => {
  const [paymentMethod, setPaymentMethod] = useState("paypal");
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePaymentChange = (event) => {
    setPaymentMethod(event.target.value);
  };

  const donorId = localStorage.getItem("donorId");
  if (!donorId) {
    donorId = "Unknown";
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!amount || isNaN(amount)) {
      alert("Please enter a valid amount.");
      return;
    }

    const dataToSend = {
      project_id: projectData.project_id, // Replace with actual project ID
      amount: parseFloat(amount),
      donor_id: donorId, // Example donor ID; replace with actual data
      message,
      payment_method: "paypal",
      currency: "USD",
    };

    console.log(dataToSend);

    if (paymentMethod ==  "creditCard") {
      console.log("Credit Card Payment");
    } else if (paymentMethod == "paypal") {
      setLoading(true); // Set loading to true during the API call
      try {
        // Call fetchPayment API
        await fetchPayment(dataToSend);

        alert("Payment initiated successfully!");
      } catch (error) {
        alert(`Error: ${error.message}`);
      } finally {
        setLoading(false); // Reset loading state
      }
    }
  };

  return (
    <div
      style={{
        backgroundColor: "#fff",
        padding: "20px",
        borderRadius: "8px",
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
        margin: "auto",
      }}
    >
      <Typography variant="h6" align="center" gutterBottom>
        Payment
      </Typography>
      <FormControl component="fieldset">
        <RadioGroup
          value={paymentMethod}
          onChange={handlePaymentChange}
          style={{ marginBottom: "16px" }}
        >
          <FormControlLabel
            value="creditCard"
            control={<Radio />}
            label="Credit Card"
          />
          <FormControlLabel value="paypal" control={<Radio />} label="PayPal" />
        </RadioGroup>
      </FormControl>

      {/* Conditional Rendering */}
      {paymentMethod === "creditCard" && (
        <Box>
          <TextField
            fullWidth
            label="Card Number"
            variant="outlined"
            margin="normal"
            required
          />
          <Box display="flex" justifyContent="space-between">
            <TextField
              label="Expiry Date"
              placeholder="MM/YY"
              variant="outlined"
              margin="normal"
              required
              style={{ flex: 1, marginRight: "8px" }}
            />
            <TextField
              label="Card Code (CVC)"
              placeholder="CVC"
              variant="outlined"
              margin="normal"
              required
              style={{ flex: 1, marginLeft: "8px" }}
            />
          </Box>
          <TextField
            fullWidth
            label="Amount"
            variant="outlined"
            margin="normal"
            required
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <TextField
            fullWidth
            label="Message (Optional)"
            variant="outlined"
            margin="normal"
            multiline
            rows={3}
            inputProps={{ maxLength: 250 }}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </Box>
      )}

      {paymentMethod === "paypal" && (
        <Box>
          <TextField
            fullWidth
            label="Amount"
            variant="outlined"
            margin="normal"
            required
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <TextField
            fullWidth
            label="Message (Optional)"
            variant="outlined"
            margin="normal"
            multiline
            rows={3}
            inputProps={{ maxLength: 250 }}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </Box>
      )}

      <Box display="flex" alignItems="center" style={{ marginTop: "8px" }}>
        <FormControlLabel
          control={<Radio />}
          label="Monthly Donation"
          style={{ fontSize: "0.875rem" }}
        />
        <Typography variant="caption" style={{ marginLeft: "8px", color: "#666" }}>
          (This is the Monthly Project, choose it if you want to donate to this
          project each month)
        </Typography>
      </Box>

      <Button
        fullWidth
        variant="contained"
        color="secondary"
        style={{ marginTop: "16px" }}
        onClick={handleSubmit}
        disabled={loading}
      >
        {loading ? "Processing..." : "Donate"}
      </Button>
    </div>
  );
};

export default PaymentForm;
