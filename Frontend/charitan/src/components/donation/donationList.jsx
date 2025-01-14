import React from "react";

const DonationList = ({ donations }) => {
  return (
    <div
      style={{
        backgroundColor: "#fff",
        padding: "20px",
        borderRadius: "8px",
        marginBottom: "20px",
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      <h3
        style={{
          marginBottom: "20px",
          fontWeight: "bold",
          textAlign: "left", 
        }}
      >
        DONATION LIST
      </h3>
      <div style={{ textAlign: "left" }}>
        {donations.map((donation, index) => (
          <p key={index} style={{ marginBottom: "10px", lineHeight: "1.6" }}>
            <strong>{donation.name}</strong> donated{" "}
            <strong>${donation.amount}</strong> for
            this project.
          </p>
        ))}
      </div>
    </div>
  );
};

export default DonationList;
