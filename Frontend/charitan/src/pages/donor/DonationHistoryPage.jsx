import React, { useEffect, useState } from 'react';
import { CircularProgress } from '@mui/material';
import axios from 'axios';
import NavigationBar from "../../components/navigationBar";
import PageBanner from '../../components/pageBanner';
import HistoryTable from '../../components/history/historyTable';

const DonationHistoryPage = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await axios.get('http://localhost:4000/api/projects');
                setProjects(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching projects:', error);
                setLoading(false);
            }
        };

        fetchProjects();
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
                <HistoryTable rows={projects} />
            </div>
        </div>
    );
};

export default DonationHistoryPage;