import React from "react";
import { Box} from "@mui/material";
import { useLocation } from "react-router-dom";
import NavigationBar from "../../components/navigationBar";
import PageBanner from "../../components/pageBanner";
import DonationContainer from "../../components/donation/donationContainer";


const DonationPage = () => {
    const location = useLocation();
    const projectData = location.state?.projectData;


    return (
        <Box>
            <NavigationBar currentPage={location.pathname} />
            <PageBanner text="Donation" />
            <DonationContainer projectData = {projectData}/>
        </Box>
    );
};

export default DonationPage;
