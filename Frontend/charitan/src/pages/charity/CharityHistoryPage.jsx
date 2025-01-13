import React, { useEffect, useState } from 'react';
import { CircularProgress } from '@mui/material';
import axios from 'axios';
import NavigationBar from "../../components/navigationBar";
import PageBanner from '../../components/pageBanner';
import HistoryTable from '../../components/history/historyTable';
import { fetchDonationHistoryCharity } from '../../utils/api/history/charityHistoryService';

const CharityHistoryPage = () => {
    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadDonationHistory = async () => {
            try {
                const charityId = localStorage.getItem("charityId"); // Retrieve charityId from local storage
                if (!charityId) {
                    throw new Error("Charity ID not found in local storage");
                }
                const data = await fetchDonationHistoryCharity(charityId);
                setRows(Array.isArray(data) ? data : []);
            } catch (err) {
                setError('Failed to load donation history. Please try again later.');
                console.error('Error loading donation history:', err);
            } finally {
                setLoading(false);
            }
        };

        loadDonationHistory();
    }, []);

    if (loading) {
        return (
            <div style={{ display: "flex", justifyContent: "center", margin: "100px" }}>
                <CircularProgress />
            </div>
        );
    }

    if (error) {
        return (
            <div style={{ display: "flex", justifyContent: "center", margin: "100px" }}>
                <p>{error}</p>
            </div>
        );
    }

    return (
        <div>
            <NavigationBar />
            <PageBanner text="History" />
            <div style={{ padding: "20px" }}>
                <HistoryTable rows={rows} userType="charity"/>
            </div>
        </div>
    );
};

export default CharityHistoryPage;