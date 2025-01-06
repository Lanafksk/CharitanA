import React from "react";
import RankingItem from "./rankingItem";

const RankingList = ({ rankers }) => {
  return (
    <div>
      {rankers.map((ranker, index) => (
        <RankingItem
          key={ranker.id}
          rank={index + 4} // 4위부터 시작
          name={ranker.name}
          amount={ranker.amount}
          profileImage={ranker.profileImage}
        />
      ))}
    </div>
  );
};

export default RankingList;
