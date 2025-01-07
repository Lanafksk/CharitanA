import React from "react";
import EmailIcon from '@mui/icons-material/MailOutline';
import { Icon as SolarIcon } from "@iconify/react";
import { Icon as MdiIcon } from "@mdi/react";
import { mdiDomain } from '@mdi/js';

const ContactInfo = ({ email, phone, address }) => {
  return (
    <div>
      <div
      style={{
        backgroundColor: "#fff",
        padding: "20px",
        borderRadius: "8px",
        marginBottom: "20px",
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
        textAlign: "left",
      }}
    >
      <div style={{marginBottom:"25px", marginTop:"10px"}}>
        <span style={{ marginBottom: "20px", fontWeight: "bold", fontSize:"20px"}}>CONTACT</span>
      </div>
      <div style={{ display: "flex", alignItems: "center", marginBottom: "20px" }}>
        <EmailIcon style={{ color: "#555", marginRight: "10px" }} />
        <span>{email}</span>
      </div>
      <div style={{ display: "flex", alignItems: "center", marginBottom: "20px" }}>
        <SolarIcon icon="solar:phone-outline" width={24} style={{ marginRight: "10px" }} />
        <span>{phone}</span>
      </div>
      <div style={{ display: "flex", alignItems: "center", marginBottom:"20px" }}>
        <MdiIcon path={mdiDomain} size={1} style={{ marginRight: "10px" }} />
        <span>{address}</span>
      </div>
      </div>
    </div>
  );
};

export default ContactInfo;
