const BASE_URL = `${process.env.REACT_APP_API_BASE_URL}/admin-server/charity/id`;

export const fetchCharityProfile = async (charityId) => {
  try {
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
    console.log("Charity Profile Data:", data);
    return data;
  } catch (error) {
    console.error('Error fetching charity profile:', error);
    throw error;
  }
};