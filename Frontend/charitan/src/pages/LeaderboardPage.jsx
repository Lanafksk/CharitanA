import React, { useState } from "react";

import NavigationBar from '../components/navigationBar';
import PageBanner from "../components/pageBanner";
import { useLocation } from "react-router-dom";

import Leaderboard from "../components/leaderboard/leaderboard";

const LeaderboardPage = () => {
  const location = useLocation();

  return (
    <div>
      <NavigationBar currentPage={location.pathname} />
      <PageBanner text="Leaderboard" />
      <Leaderboard />
    </div>
  );
};

export default LeaderboardPage;
