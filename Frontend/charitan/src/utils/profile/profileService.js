const BASE_URL = 'http://192.168.68.103:5001/admin-server/charity/id';

export const fetchCharityProfile = async (charityId) => {
  try {
    const response = await fetch(
      `${BASE_URL}/${charityId}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          // Add any authentication headers if required
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching charity profile:', error);
    throw error;
  }
}