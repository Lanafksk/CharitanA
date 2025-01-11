import React, { useState } from "react";
import NavigationBar from '../components/navigationBar';
import PageBanner from "../components/pageBanner";
import UserProfile from "../components/user/userProfile";

const CharityProfilePage = () => {
  // Setting up the initial data as state instead of constant
  const [profileData, setProfileData] = useState({
    charityName: "Charity",
    phoneNumber: "06528916649",
    emailAddress: "dornora@gmail.com",
    country: "Vietnam",
    address: "702 Nguyen Van Linh, D7, HCM City",
    type: "Individual",
    taxCode: "246-357",
    totalAmount: 1440,
    totalProjects: 12
  });

  // Handler to update the profile data
  const handleProfileUpdate = (updatedData) => {
    setProfileData(updatedData);
  };

  return (
    <div>
      <NavigationBar />
      <PageBanner text="PROFILE" />
      <UserProfile
        type="charity"
        profileData={profileData}
        onUpdateProfile={handleProfileUpdate}
      />
    </div>
  );
};

export default CharityProfilePage ;