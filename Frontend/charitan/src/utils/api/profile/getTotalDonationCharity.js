const BASE_URL = `${process.env.REACT_APP_API_BASE_URL}/client-server/donation/total-donations/charity`;

export const fetchTotalDonationCharity = async (charityId) => {
  try {
    console.log(BASE_URL);
    const response = await fetch(
      `${BASE_URL}/${charityId}`,
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
    console.log("Charity total donation:", data.totalAmount);
    return data.donationResponse.totalAmount;
  } catch (error) {
    console.error('Error fetching charity donation amount:', error);
    throw error;
  }
};