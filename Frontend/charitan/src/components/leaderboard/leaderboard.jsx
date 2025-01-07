import React, { useState, useEffect } from "react";
// import axios from "axios";
import LeaderboardHeader from "./leaderboardHeader"
import TopRankers from "./topRankers";
import RankingList from "./rankingList";

const Leaderboard = () => {
  const [data, setData] = useState([]);
  const [sortBy, setSortBy] = useState("DONOR");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const donorData = [
    { id: 1, name: "Dornor A", amount: 500, profileImage: "" },
    { id: 2, name: "Dornor B", amount: 300, profileImage: "" },
    { id: 3, name: "Dornor C", amount: 200, profileImage: "" },
    { id: 4, name: "Dornor D", amount: 150, profileImage: "" },
    { id: 5, name: "Dornor E", amount: 100, profileImage: "" },
    { id: 6, name: "Dornor F", amount: 80, profileImage: "" },
    { id: 7, name: "Dornor G", amount: 70, profileImage: "" },
    { id: 8, name: "Dornor H", amount: 600, profileImage: "" },
    { id: 9, name: "Dornor I", amount: 50, profileImage: "" },
    { id: 10, name: "Dornor J", amount: 40, profileImage: "" },
  ];

  // Mock data for charities
  const charityData = [
    { id: 1, name: "Charity A", amount: 1000, profileImage: "" },
    { id: 2, name: "Charity B", amount: 800, profileImage: "" },
    { id: 3, name: "Charity C", amount: 600, profileImage: "" },
    { id: 4, name: "Charity D", amount: 500, profileImage: "" },
    { id: 5, name: "Charity E", amount: 400, profileImage: "" },
    { id: 6, name: "Charity F", amount: 300, profileImage: "" },
    { id: 7, name: "Charity G", amount: 200, profileImage: "" },
    { id: 8, name: "Charity H", amount: 100, profileImage: "" },
    { id: 9, name: "Charity I", amount: 80, profileImage: "" },
    { id: 10, name: "Charity J", amount: 50, profileImage: "" },
  ]; 

//   // API call
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get("/api/leaderboard"); 
//         setData(response.data); 
//         setLoading(false);
//       } catch (err) {
//         setError("Failed to fetch data");
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

  // Choose data based on sortBy state
  // data = sortBy === "DONOR" ? donorData : charityData;

  // update by sortby
  useEffect(() => {
    if (sortBy === "DONOR") {
      setData(donorData);
    } else if (sortBy === "CHARITY") {
      setData(charityData);
    }
  }, [sortBy]); 

  console.log(sortBy);
  console.log(data);

  // data setting
  const sortedData = [...data].sort((a, b) => b.amount - a.amount);
  const topRankers = sortedData.slice(0, 3); // from 1st to 3rd
  const remainingRankers = sortedData.slice(3);

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>{error}</p>;

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
      <LeaderboardHeader title={sortBy} onSortChange={setSortBy} />
      <TopRankers topRankers={topRankers} />
      <RankingList rankers={remainingRankers} />
    </div>
  );
};

export default Leaderboard;
