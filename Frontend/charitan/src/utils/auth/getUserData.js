const BASE_URL = `${process.env.REACT_APP_API_BASE_URL}/admin-server/charity/token`;

export const fetchUserData = async () => {
  try {
    const response = await fetch(
      BASE_URL,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // means cookies will be sent
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Charity Token Data:", data);
    return data;
  } catch (error) {
    console.error('Error fetching charity token:', error);
    throw error;
  }
};

