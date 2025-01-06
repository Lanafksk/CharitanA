import React from "react";

const RankingItem = ({ rank, name, amount, profileImage }) => {
  return (
    <div style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
      <span style={{ width: "20px", textAlign: "center" }}>{rank}</span>
      <div
        style={{
          width: "30px",
          height: "30px",
          borderRadius: "50%",
          backgroundColor: "#ddd",
          marginRight: "10px",
        }}
      ></div>
      <span style={{ flexGrow: 1 }}>{name}</span>
      <span>${amount}</span>
    </div>
  );
};

export default RankingItem;
