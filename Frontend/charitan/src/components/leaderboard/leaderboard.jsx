import React, { useState, useEffect } from "react";
import LeaderboardHeader from "./leaderboardHeader";
import TopRankers from "./topRankers";
import RankingList from "./rankingList";
import { fetchDonorLeaderboard, fetchCharityLeaderboard } from "../../utils/api/leaderboard/donorLeaderboardService";
import { fetchDonorProfile } from "../../utils/api/profile/profileService";

const Leaderboard = () => {
  const [data, setData] = useState([]);
  const [sortBy, setSortBy] = useState("DONOR"); // Default sorting by donor
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadLeaderboardData = async () => {
      try {
        setLoading(true); // Start loading
        let leaderboardData = [];

        if (sortBy === "DONOR") {
          // Fetch donor leaderboard
          leaderboardData = await fetchDonorLeaderboard();

          // Replace donor_id with donor name
          const formattedData = await Promise.all(
            leaderboardData.map(async (item) => {
              try {
                return {
                  ...item,
                  name: item.name, // Replace donor_id with donor name
                  amount: Math.floor(item.totalAmount), // Remove decimals
                  image: item.profileImage, // Use img_url directly
                };
              } catch (err) {
                console.error(`Error fetching profile for donor ${item.donor_id}:`, err);
                return {
                  ...item,
                  name: "Unknown Donor", // Fallback name
                  amount: Math.floor(item.totalAmount),
                };
              }
            })
          );

          setData(formattedData); // Save donor data
        } else if (sortBy === "CHARITY") {
          // Fetch charity leaderboard
          leaderboardData = await fetchCharityLeaderboard();

          // Format charity data
          const formattedData = leaderboardData.map((item) => ({
            name: item.charity_name, // Use charity_name directly
            amount: Math.floor(item.totalDonation), // Remove decimals
            profileImage: item.profileImage, // Use profileImage directly
          }));

          setData(formattedData); // Save charity data
        }
      } catch (err) {
        setError(err.message); // Handle error
      } finally {
        setLoading(false); // Stop loading
      }
    };

    loadLeaderboardData();
  }, [sortBy]); // Reload data when `sortBy` changes

  // Sort data
  const sortedData = [...data].sort((a, b) => b.amount - a.amount);
  const topRankers = sortedData.slice(0, 3); // Top 3 rankers
  const remainingRankers = sortedData.slice(3); // Remaining rankers

  // Loading and error handling
  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  // Render the leaderboard
  return (
    <div
      style={{
        padding: "20px",
        border: "1px solid #ddd",
        borderRadius: "8px",
        backgroundColor: "#fff",
        maxWidth: "800px",
        margin: "80px auto",
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      {/* Header with sorting options */}
      <LeaderboardHeader title={sortBy} onSortChange={setSortBy} />

      {/* Top 3 Rankers */}
      <TopRankers topRankers={topRankers} />

      {/* Remaining Rankers */}
      <RankingList rankers={remainingRankers} />
    </div>
  );
};

export default Leaderboard;
