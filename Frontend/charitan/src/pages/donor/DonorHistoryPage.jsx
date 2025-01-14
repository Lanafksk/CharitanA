import React, { useEffect, useState } from 'react';
import { CircularProgress } from '@mui/material';
import axios from 'axios';
import NavigationBar from "../../components/navigationBar";
import PageBanner from '../../components/pageBanner';
import HistoryTable from '../../components/history/historyTable';
import { fetchDonationHistoryDonor } from '../../utils/api/history/donorHistoryService';

const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    }).replace(/(\d+) ([A-Za-z]+) (\d+)/, '$1 - $2 - $3');
  };
  
  const formatAmount = (amount) => {
    return `$${Number(amount).toFixed(2)}`;
  };

const DonorHistoryPage = () => {
    const [donations, setDonations] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const donorId = localStorage.getItem('donorId');
        const loadDonations = async () => {
          try {
            const donationData = await fetchDonationHistoryDonor(donorId);
            console.log("Donor total donations:", donationData);

            const formattedDonations = donationData.map(donation => ({
              id: donation.donor_id,
              receiver: donation.payment_id,
              project: donation.project_id,
              amount: formatAmount(donation.amount),
              date: formatDate(donation.createdAt),
              status: donation.status,
              message: donation.message || 'No message',
            }));
            setDonations(formattedDonations);
          
            } catch (err) {
                setError(err.message);
            } finally {
            setLoading(false);
          }
        };
    
        loadDonations();
      }, []);
    

    if (loading) {
        return (
            <div style={{ display: "flex", justifyContent: "center", margin: "100px" }}>
                <CircularProgress />
            </div>
            );
    }

    return (
        <div>
            <NavigationBar />
            <PageBanner text="History" />
            <div style={{ padding: "20px" }}>
                <HistoryTable rows={donations} userType="donor"/>
            </div>
        </div>
    );
};

export default DonorHistoryPage;