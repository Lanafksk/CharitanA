const BASE_URL_DONOR = `${process.env.REACT_APP_API_BASE_URL}/admin-server/statistics/donors/leaderboard`;
const BASE_URL_CHARITY = `${process.env.REACT_APP_API_BASE_URL}/admin-server/statistics/charities/leaderboard`;

export const fetchDonorLeaderboard = async () => {
  try {
    const response = await fetch(
      `${BASE_URL_DONOR}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Donor leaderboard:", data.data);
    return data.data;
  } catch (error) {
    console.error('Error fetching Donor leaderboard:', error);
    throw error;
  }
};

export const fetchCharityLeaderboard = async () => {
    try {
      const response = await fetch(
        `${BASE_URL_CHARITY}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        }
      );
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
      console.log("Donor leaderboard:", data.data);
      return data.data;
    } catch (error) {
      console.error('Error fetching Donor leaderboard:', error);
      throw error;
    }
  };