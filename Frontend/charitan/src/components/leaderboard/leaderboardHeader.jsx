import React from "react";

const LeaderboardHeader = ({ title, onSortChange }) => {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "30px" }}>
      <select
        value={title}
        onChange={(e) => onSortChange(e.target.value)}
        style={{
          padding: "8px",
          border: "0px",
          fontSize: "20px",
          fontWeight: "bold"
        }}
      >
        <option value="DONOR">DONOR</option>
        <option value="CHARITY">CHARITY</option>
      </select>
    </div>
  );
};

export default LeaderboardHeader;
