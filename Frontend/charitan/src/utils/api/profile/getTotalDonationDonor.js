// const BASE_URL = `${process.env.REACT_APP_TEAM_A_BACKEND_URL}/api/donations/charity/total-donations`;

const BASE_URL = `${process.env.REACT_APP_API_BASE_URL}/admin-server/statistics/donations/by-donor`;

export const fetchTotalDonationDonor = async (donorId) => {
  try {
    console.log(BASE_URL);
    const response = await fetch(
      `${BASE_URL}/${donorId}`,
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
    console.log("data:" + data);
    // console.log("Donor total donation:", data.totalAmount);
    return data.donationResponse.totalAmount;
  } catch (error) {
    console.error('Error fetching donor donation amount:', error);
    throw error;
  }
};