// pages/charity/CharityProfilePage.jsx
import React, { useState, useEffect } from "react";
import NavigationBar from '../../components/navigationBar';
import PageBanner from "../../components/pageBanner";
import UserProfile from "../../components/user/userProfile";
import { fetchCharityProfile } from '../../utils/profile/profileService';
import { fetchTotalDonationCharity } from "../../utils/profile/getTotalDonationCharity";
import { fetchTotalProjectsCharity } from "../../utils/profile/getTotalProjectsCharity";

const CharityProfilePage = () => {
  // State for profile data
  const [profileData, setProfileData] = useState({
    charityName: "",
    phoneNumber: "",
    emailAddress: "",
    country: "",
    address: "",
    type: "",
    taxCode: "",
    totalAmount: 0,
    totalProjects: 0
  });

  // Add loading and error states for better user experience
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to load charity profile data
  const loadCharityProfile = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const charityId = localStorage.getItem("charityId"); // Retrieve charityId from local storage
      if (!charityId) {
        throw new Error("Charity ID not found in local storage");
      }
      const response = await fetchCharityProfile(charityId);
      
      // Make sure we're accessing the data property from the API response
      const charityData = response.data;
  
      // Format the address from the nested object
      const formattedAddress = charityData.address 
        ? `${charityData.address.street}, ${charityData.address.city}, ${charityData.address.state} ${charityData.address.zip}`
        : "";
  
      const totalDonationData = await fetchTotalDonationCharity(charityId);  

      // const totalProjectsData = await fetchTotalProjectsCharity(charityId);
      // Transform the data with correct property mappings
      const transformedData = {
        charityName: charityData.name || "",
        phoneNumber: charityData.phone || "",
        emailAddress: charityData.email || "",
        country: charityData.country || "",
        address: formattedAddress,
        type: charityData.type || "",
        taxCode: charityData.tax_code || "",
        totalAmount: totalDonationData != null ? totalDonationData : 6969,  
        // totalProjects: totalProjectsData != null ? totalDonationData : 6969, 
      };
  
      setProfileData(transformedData);
    } catch (err) {
      setError('Failed to load charity profile. Please try again later.');
      console.error('Error loading charity profile:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Load data when component mounts
  useEffect(() => {
    loadCharityProfile();
  }, []);

  // Handler to update the profile data
  const handleProfileUpdate = async (updatedData) => {
    try {
      // Here you would typically make an API call to update the data
      // For now, we'll just update the local state
      setProfileData(updatedData);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  if (isLoading) {
    return (
      <div>
        <NavigationBar />
        <PageBanner text="PROFILE" />
        <div className="flex justify-center items-center min-h-screen">
          <p>Loading profile...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <NavigationBar />
        <PageBanner text="PROFILE" />
        <div className="flex justify-center items-center min-h-screen">
          <p className="text-red-500">{error}</p>
        </div>
      </div>
    );
  }

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

export default CharityProfilePage;