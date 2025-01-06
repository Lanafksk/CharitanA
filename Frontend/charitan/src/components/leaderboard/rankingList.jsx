import React from "react";
import RankingItem from "./rankingItem";

const RankingList = ({ rankers, displayField }) => {
  return (
    <div>
      {rankers.map((ranker, index) => (
        <RankingItem
          key={ranker.id}
          rank={index + 4} // start from 4th
          name={ranker.name}
          amount={ranker.amount}
          profileImage={ranker.profileImage}
        />
      ))}
    </div>
  );
};

export default RankingList;
