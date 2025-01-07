import React from "react";

const MessageBox = () => {
  return (
    <div style={{ backgroundColor: "#fff", padding: "20px", borderRadius: "8px", marginTop: "20px" }}>
      <textarea
        placeholder="Send your message here..."
        style={{ width: "100%", height: "100px", borderRadius: "8px", padding: "10px", border: "1px solid #ddd" }}
      ></textarea>
      <button
        style={{
          marginTop: "10px",
          width: "100%",
          padding: "10px",
          backgroundColor: "#d81b60",
          color: "#fff",
          border: "none",
          borderRadius: "8px",
        }}
      >
        Donate
      </button>
    </div>
  );
};

export default MessageBox;
