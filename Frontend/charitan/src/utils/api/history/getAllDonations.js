const BASE_URL = `${process.env.REACT_APP_API_BASE_URL}/client-server/donation`;
export const fetchAllDonations = async () => {
  try {
    const response = await fetch(
      `${BASE_URL}`,
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
    console.log("Total donations:", data.donationResponse);
    return data.donationResponse;
  } catch (error) {
    console.error('Error fetching donations:', error);
    throw error;
  }
};