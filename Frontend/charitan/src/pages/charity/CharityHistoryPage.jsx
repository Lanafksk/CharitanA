import React, { useEffect, useState } from 'react';
import { CircularProgress } from '@mui/material';
import NavigationBar from "../../components/navigationBar";
import PageBanner from '../../components/pageBanner';
import HistoryTable from '../../components/history/historyTable';
import { fetchAllDonations } from '../../utils/api/history/getAllDonations';
import { fetchDonationHistoryCharity } from '../../utils/api/history/charityHistoryService';

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

const CharityHistoryPage = () => {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadDonations = async () => {
      try {
        const donationData = await fetchAllDonations();
        const formattedDonations = donationData.map(donation => ({
          id: donation.donation_id,
          donor: donation.donor_id,
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
      <div className="flex justify-center items-center h-screen">
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <NavigationBar />
        <PageBanner text="History" />
        <div className="p-4 text-red-600">
          Error loading donations: {error}
        </div>
      </div>
    );
  }

  return (
    <div>
      <NavigationBar />
      <PageBanner text="History" />
      <div className="p-5">
        <HistoryTable rows={donations} userType="charity"/>
      </div>
    </div>
  );
};

export default CharityHistoryPage;