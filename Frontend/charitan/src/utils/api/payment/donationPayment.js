const BASE_URL = `${process.env.REACT_APP_API_BASE_URL}/client-server/payment`;

export const fetchPayment = async ({
  project_id,
  amount,
  donor_id,
  message,
  payment_method,
  currency,
}) => {
  try {
    console.log(BASE_URL);

    const response = await fetch(`${BASE_URL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        project_id: project_id,
        amount: amount,
        donor_id: donor_id,
        message: message,
        payment_method: payment_method,
        currency: currency, 
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (data.approvalUrl) {
      // Redirect to PayPal's approval URL
      console.log("Redirecting to approval URL:", data.approvalUrl);
      window.open(data.approvalUrl, "_blank");
    } else {
      throw new Error("Approval URL not received from backend.");
    }

    return data;
  } catch (error) {
    console.error("Error initiating payment:", error);
    throw error;
  }
};
