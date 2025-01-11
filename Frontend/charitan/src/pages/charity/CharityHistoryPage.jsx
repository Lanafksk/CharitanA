import React, { useEffect, useState } from 'react';
import { CircularProgress } from '@mui/material';
import axios from 'axios';
import NavigationBar from "../../components/navigationBar";
import PageBanner from '../../components/pageBanner';
import HistoryTable from '../../components/history/historyTable';

const CharityHistoryPage = () => {
    // const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(false);

          // Example data
          const rows = [
            { id: "DON001", donor: "DON001", project: "PRO001", amount: "$300", date: "08 - Feb - 2024", status: "Success", message: "Example message..." },
            { id: "DON002", donor: "DON002", project: "PRO002", amount: "$400", date: "09 - Feb - 2024", status: "Success", message: "Another message..." },
            { id: "DON003", donor: "DON003", project: "PRO003", amount: "$500", date: "10 - Feb - 2024", status: "Success", message: "Yet another message..." },
            { id: "DON001", donor: "DON001", project: "PRO001", amount: "$300", date: "08 - Feb - 2024", status: "Success", message: "Example message..." },
            { id: "DON001", donor: "DON001", project: "PRO001", amount: "$300", date: "08 - Feb - 2024", status: "Success", message: "Example message..." },
            { id: "DON001", donor: "DON001", project: "PRO001", amount: "$300", date: "08 - Feb - 2024", status: "Success", message: "Example message..." },
            { id: "DON001", donor: "DON001", project: "PRO001", amount: "$300", date: "08 - Feb - 2024", status: "Success", message: "Example message..." },
            { id: "DON001", donor: "DON001", project: "PRO001", amount: "$300", date: "08 - Feb - 2024", status: "Success", message: "Example message..." },
            { id: "DON001", donor: "DON001", project: "PRO001", amount: "$300", date: "08 - Feb - 2024", status: "Success", message: "Example message..." },
            { id: "DON001", donor: "DON001", project: "PRO001", amount: "$300", date: "08 - Feb - 2024", status: "Success", message: "Example message..." },
            { id: "DON001", donor: "DON001", project: "PRO001", amount: "$300", date: "08 - Feb - 2024", status: "Success", message: "Example message..." },
            { id: "DON001", donor: "DON001", project: "PRO001", amount: "$300", date: "08 - Feb - 2024", status: "Success", message: "Example message..." },
            { id: "DON002", donor: "DON002", project: "PRO002", amount: "$400", date: "09 - Feb - 2024", status: "Success", message: "Another message..." },
            { id: "DON003", donor: "DON003", project: "PRO003", amount: "$500", date: "10 - Feb - 2024", status: "Success", message: "Yet another message..." },
            { id: "DON001", donor: "DON001", project: "PRO001", amount: "$300", date: "08 - Feb - 2024", status: "Success", message: "Example message..." },
            { id: "DON001", donor: "DON001", project: "PRO001", amount: "$300", date: "08 - Feb - 2024", status: "Success", message: "Example message..." },
            { id: "DON001", donor: "DON001", project: "PRO001", amount: "$300", date: "08 - Feb - 2024", status: "Success", message: "Example message..." },
            { id: "DON001", donor: "DON001", project: "PRO001", amount: "$300", date: "08 - Feb - 2024", status: "Success", message: "Example message..." },
            { id: "DON001", donor: "DON001", project: "PRO001", amount: "$300", date: "08 - Feb - 2024", status: "Success", message: "Example message..." },
            { id: "DON001", donor: "DON001", project: "PRO001", amount: "$300", date: "08 - Feb - 2024", status: "Success", message: "Example message..." },
            { id: "DON001", donor: "DON001", project: "PRO001", amount: "$300", date: "08 - Feb - 2024", status: "Success", message: "Example message..." },
            { id: "DON001", donor: "DON001", project: "PRO001", amount: "$300", date: "08 - Feb - 2024", status: "Success", message: "Example message..." },
        
          ];

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
                <HistoryTable rows={rows} userType="charity"/>
            </div>
        </div>
    );
};

export default CharityHistoryPage;