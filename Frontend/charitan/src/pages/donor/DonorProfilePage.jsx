// pages/charity/CharityProfilePage.jsx
import React, { useState, useEffect } from "react";
import NavigationBar from '../../components/navigationBar';
import PageBanner from "../../components/pageBanner";
import UserProfile from "../../components/user/userProfile";
import { fetchDonorProfile } from '../../utils/profile/profileService';
import { fetchTotalDonationCharity } from "../../utils/profile/getTotalDonationCharity";
import { fetchTotalProjectsCharity } from "../../utils/profile/getTotalProjectsCharity";

const DonorProfilePage = () => {
  // State for profile data
  const [profileData, setProfileData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    emailAddress: "",
    country: "",
    address: "",
    totalAmount: 0,
    totalProjects: 0
  });

  // Add loading and error states for better user experience
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to load charity profile data
  const loadDonorProfile = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const donorId = localStorage.getItem("donorId"); // Retrieve charityId from local storage
      if (!donorId) {
        throw new Error("Donor ID not found in local storage");
      }
      const response = await fetchDonorProfile(donorId);
      
      // Make sure we're accessing the data property from the API response
      const donorData = response.data;
  
      // Format the address from the nested object
      const formattedAddress = donorData.address 
        ? `${donorData.address.street}, ${donorData.address.city}, ${donorData.address.state} ${donorData.address.zip}`
        : "";
  
      // Fetch total donation and total projects data TEAM A BE
      // const totalDonationData = await fetchTotalDonationCharity(charityId);  
      // const totalProjectsData = await fetchTotalProjectsCharity(charityId);

      // Transform the data with correct property mappings
      const transformedData = {
        firstName: donorData.first_name ||"",
        lastName: donorData.last_name ||"",
        phoneNumber: donorData.phone || "",
        emailAddress: donorData.email || "",
        country: donorData.country || "",
        address: formattedAddress || "",
        // totalAmount: 0,
        // totalProjects: 0
      };
  
      setProfileData(transformedData);
    } catch (err) {
      setError('Failed to load donor profile. Please try again later.');
      console.error('Error loading donor profile:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Load data when component mounts
  useEffect(() => {
    loadDonorProfile();
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
        type="donor"
        profileData={profileData}
        onUpdateProfile={handleProfileUpdate}
      />
    </div>
  );
};

export default DonorProfilePage;