import React from "react";

const ProjectDescription = ({ location, description, raised, goal, status }) => {
  const percentage = (raised / goal) * 100;

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
      <h3 style={{ textAlign: "left", fontSize:"20px"}}>Project in: {location}</h3>
      <p style={{ textAlign: "left", lineHeight: "1.6" }}>{description}</p>
      <div style={{paddingInline:"20px", marginTop:"30px"}}>
        <div
          style={{
            margin: "10px 0",
            height: "10px",
            backgroundColor: "#ddd",
          }}
        >
          <div
            style={{
              width: `${percentage}%`,
              backgroundColor: "#FB1465",
              height: "100%",
            }}
          ></div>
        </div>
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop:"20px" }}>
        <div style={{ color: "#666", margin: 0 }}>
          <span style={{ color: "#FB1465", fontWeight: "bold", fontSize:"20px" }}>
            ${raised.toLocaleString()}
          </span>{" "}
          of ${goal.toLocaleString()} raised
        </div>
        <span style={{ color: "#00FF26", fontWeight: "bold" }}>{status.toLocaleString()}</span>
      </div>
    </div>
  );
};

export default ProjectDescription;
