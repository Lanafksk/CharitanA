import React, { useState } from "react";
import LeaderboardHeader from "../components/leaderboard/leaderboardHeader";
import TopRankers from "../components/leaderboard/topRankers";
import RankingList from "../components/leaderboard/rankingList";

const LeaderboardPage = () => {
  const mockData = [
    { id: 1, name: "Dornor A", amount: 500, profileImage: "" },
    { id: 2, name: "Dornor B", amount: 300, profileImage: "" },
    { id: 3, name: "Dornor C", amount: 200, profileImage: "" },
    { id: 4, name: "Dornor D", amount: 150, profileImage: "" },
    { id: 5, name: "Dornor E", amount: 100, profileImage: "" },
    { id: 6, name: "Dornor F", amount: 80, profileImage: "" },
    { id: 7, name: "Dornor G", amount: 70, profileImage: "" },
    { id: 8, name: "Dornor H", amount: 60, profileImage: "" },
    { id: 9, name: "Dornor I", amount: 50, profileImage: "" },
    { id: 10, name: "Dornor J", amount: 40, profileImage: "" },
  ];

  const [sortBy, setSortBy] = useState("DONOR");

  // 정렬된 데이터 계산
  const sortedData = [...mockData].sort((a, b) => b.amount - a.amount); // 금액 기준 내림차순
  const topRankers = sortedData.slice(0, 3); // 상위 3명
  const remainingRankers = sortedData.slice(3); // 나머지

  return (
    <div style={{ padding: "20px", border: "1px solid #ddd", borderRadius: "8px" }}>
      <LeaderboardHeader title={sortBy} onSortChange={setSortBy} />
      <TopRankers topRankers={topRankers} />
      <RankingList rankers={remainingRankers} />
    </div>
  );
};

export default LeaderboardPage;
