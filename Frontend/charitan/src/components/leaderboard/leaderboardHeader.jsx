import React from "react";

const LeaderboardHeader = ({ title, onSortChange }) => {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
      <h2 style={{ margin: 0 }}>{title}</h2>
      <select
        value={title}
        onChange={(e) => onSortChange(e.target.value)}
        style={{
          padding: "8px",
          borderRadius: "4px",
          border: "1px solid #ddd",
        }}
      >
        <option value="DONOR">DONOR</option>
        <option value="AMOUNT">AMOUNT</option>
      </select>
    </div>
  );
};

export default LeaderboardHeader;
