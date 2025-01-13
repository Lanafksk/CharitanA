1/ POST Method http://localhost:4000/api/payments

For frontend add this block code:

try {
    //HTTP Request
    const response = await fetch("http://localhost:4000/api/payments", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            project_id: projectId,
            amount: amount,
            donor_id: donorId,
            message: message,
            payment_method: "paypal",
            currency: "USD"
        }),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to initiate payment");
    }

    const data = await response.json();

    if (data.approvalUrl) {
        // Redirect to PayPal's approval URL
        window.open(data.approvalUrl, '_blank');
    } else {
        throw new Error("Approval URL not received from backend.");
    }
} catch (error) {
    console.error("Error initiating payment:", error);
    paymentStatus.textContent = `Error: ${error.message}`;
}
