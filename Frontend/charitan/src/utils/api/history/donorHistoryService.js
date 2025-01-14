const BASE_URL = `${process.env.REACT_APP_API_BASE_URL}/client-server/donation/history`;
export const fetchDonationHistoryDonor = async (donorId) => {
  try {
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
    console.log("Donor total donations:", data.donationResponse);
    return data.donationResponse;
  } catch (error) {
    console.error('Error fetching charity donations:', error);
    throw error;
  }
};