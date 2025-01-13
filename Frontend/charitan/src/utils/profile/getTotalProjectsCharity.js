const BASE_URL = `${process.env.REACT_APP_TEAM_A_BACKEND_URL}/api/donations/charity/project-count`;
export const fetchTotalProjectsCharity = async (charityId) => {
  try {
    console.log(BASE_URL);
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
    console.log("Charity total projects:", data.totalAmount);
    return data;
  } catch (error) {
    console.error('Error fetching charity projects count:', error);
    throw error;
  }
};