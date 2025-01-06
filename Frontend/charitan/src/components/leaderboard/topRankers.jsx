import React from "react";

const TopRankers = ({ topRankers }) => {
  const medalColors = ["#FFD700", "#C0C0C0", "#CD7F32"]; // 금, 은, 동 메달 색상

  return (
    <div style={{ display: "flex", justifyContent: "space-around", marginBottom: "20px" }}>
      {topRankers.map((ranker, index) => (
        <div key={ranker.id} style={{ textAlign: "center" }}>
          <div
            style={{
              width: "50px",
              height: "50px",
              backgroundColor: medalColors[index],
              borderRadius: "50%",
              margin: "0 auto",
            }}
          ></div>
          <p>{ranker.name}</p>
          <p>${ranker.amount}</p>
        </div>
      ))}
    </div>
  );
};

export default TopRankers;
