import React from "react";
import CarouselSection from "./carouselSection";
import ProjectDescription from "./projectDescription";
import ContactInfo from "./contactInfo";
import PaymentForm from "./paymentForm";
import MessageBox from "./messageBox";
import DonationList from "./donationList";

const DonationContainer = () => {
  
  const projectData = {
    title: "Project A",
    company: "Company A",
    category: "Education",
    email: "companyA@gmail.com",
    phone: "+84927874001",
    address: "702 Nguyen Van Linh st, D7, HCM City, Vietnam",
    location: "Germany",
    description:
      "When it comes to supporting charitable organizations When it comes to supporting charitable organizations When it comes to supporting charitable organizations When it comes to supporting charitable organizations When it comes to supporting charitable organizations When it comes to supporting charitable organizations ...",
    raised: 30000,
    goal: 100000,
    status: "available",
    donationList: [
      { name: "Thanh Vinh", amount: 100 },
      { name: "Vally Duc Anh", amount: 900 },
      { name: "Dang Vinh Luan", amount: 500 },
      { name: "User", amount: 100 },
      { name: "Vally Duc Anh", amount: 900 },
      { name: "User", amount: 500 },
      { name: "Thanh Vinh", amount: 100 },
    ],
    images: [
      "https://via.placeholder.com/800x400?text=Image+1",
      "https://via.placeholder.com/800x400?text=Image+2",
      "https://via.placeholder.com/800x400?text=Image+3",
    ],
  };  

  return (
    <div style={{ padding: "50px 200px" }}>
      <CarouselSection images={projectData.images} />
      <div style={{ display: "flex", marginTop: "20px", gap: "20px" }}>
        {/* Left column for project info */}
        <div style={{ flex: 1 }}>
          <ProjectDescription {...projectData} />
          <ContactInfo {...projectData} />
          <DonationList donations={projectData.donationList} />
        </div>

        {/* Right column for payment */}
        <div style={{ flex: 1 }}>
          <PaymentForm />
          <MessageBox />
        </div>
      </div>
    </div>
  );
};

export default DonationContainer;
