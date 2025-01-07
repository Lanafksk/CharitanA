import React from "react";

const RankingItem = ({ rank, name, amount, profileImage }) => {
  return (
    <div style={{ display: "flex", alignItems: "center", marginBottom: "10px", paddingInline:"55px"}}>
      {/* rank */}
      <span style={{ width: "20px", textAlign: "center", paddingRight:"50px" }}>{rank}</span>
      {/* image */}
      <div
        style={{
          width: "30px",
          height: "30px",
          borderRadius: "50%",
          backgroundColor: "#ddd",
          marginRight: "10px",
        }}
      ></div>
      {/* name */}
      <span style={{ flexGrow: 1, textAlign: "center"}}>{name}</span>
      {/* amount */}
      <span style={{paddingRight:"50px", textAlign: "center"}}>${amount}</span>
    </div>
  );
};

export default RankingItem;
