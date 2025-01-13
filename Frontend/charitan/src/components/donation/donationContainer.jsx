import React from "react";
import CarouselSection from "./carouselSection";
import ProjectDescription from "./projectDescription";
import ContactInfo from "./contactInfo";
import PaymentForm from "./paymentForm";
import MessageBox from "./messageBox";
import DonationList from "./donationList";
import DonationHeader from "./donatinoHeader";

const DonationContainer = ({ projectData }) => {
  // Transform project data to match the expected format
  const formattedProjectData = {
    title: projectData.title,
    company: projectData.charity_id,
    category: projectData.category,
    email: projectData.email || "Not provided",
    phone: projectData.phone || "Not provided",
    address: projectData.address || "Not provided",
    location: `${projectData.country}, ${projectData.region}`,
    description: projectData.description,
    raised: projectData.current_amount,
    goal: projectData.target_amount,
    status: projectData.status,
    donationList: projectData.donations || [],
    images: projectData.images?.length > 0 
      ? projectData.images.map(img => img.url || img)
      : ["https://via.placeholder.com/800x400?text=No+Image"]
  };

  return (
    <div style={{ padding: "50px 200px" }}>
      <CarouselSection images={formattedProjectData.images} />
      <DonationHeader {...formattedProjectData} />
      <div style={{ display: "flex", marginTop: "20px", gap: "20px" }}>
        <div style={{ flex: 1 }}>
          <ProjectDescription {...formattedProjectData} />
          <ContactInfo {...formattedProjectData} />
          <DonationList donations={formattedProjectData.donationList} />
        </div>
        <div style={{ flex: 1 }}>
          <PaymentForm projectData={formattedProjectData} />
          <MessageBox />
        </div>
      </div>
    </div>
  );
};

export default DonationContainer;
