const BASE_URL = `${process.env.REACT_APP_API_BASE_URL}/client-server/donation/donation-list/charity`;
export const fetchDonationHistoryCharity = async (charityId) => {
  try {
    const response = await fetch(
      `${BASE_URL}/${charityId}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        // credentials: 'include',
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Charity total donations:", data);
    return data;
  } catch (error) {
    console.error('Error fetching charity donations:', error);
    throw error;
  }
};