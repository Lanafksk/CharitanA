import React from "react";
import { Icon } from "@iconify/react";

const TopRankers = ({ topRankers }) => {
  const [firstPlace = {}, secondPlace = {}, thirdPlace = {}] = topRankers;

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-around",
        alignItems: "flex-end", // set flex for the firstplace
        marginBottom: "20px",
      }}
    >
      {/* 2nd */}
      <div
        style={{
          textAlign: "center",
          margin: "0 20px",
        }}
      >
        <Icon icon="twemoji:2nd-place-medal" width={50} />
        <p style={{ fontWeight: "bold", margin: "10px 0 5px" }}>{secondPlace.name}</p>
        <p style={{ color: "#555", margin: 0 }}>${secondPlace.amount}</p>
      </div>

      {/* 1st */}
      <div
        style={{
          textAlign: "center",
          margin: "0 20px",
          transform: "translateY(-20px)", // higher position for the first place
        }}
      >
        <Icon icon="twemoji:1st-place-medal" width={60} />
        <p style={{ fontWeight: "bold", margin: "10px 0 5px", fontSize: "1.2em" }}>{firstPlace.name}</p>
        <p style={{ color: "#555", margin: 0, fontSize: "1.1em" }}>${firstPlace.amount}</p>
      </div>

      {/* 3rd */}
      <div
        style={{
          textAlign: "center",
          margin: "0 20px",
        }}
      >
        <Icon icon="twemoji:3rd-place-medal" width={50} />
        <p style={{ fontWeight: "bold", margin: "10px 0 5px" }}>{thirdPlace.name}</p>
        <p style={{ color: "#555", margin: 0 }}>${thirdPlace.amount}</p>
      </div>
    </div>
  );
};

export default TopRankers;
