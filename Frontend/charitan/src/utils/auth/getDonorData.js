const BASE_URL = `${process.env.REACT_APP_API_BASE_URL}/admin-server/donor/token`;

export const fetchDonorData = async () => {
  try {
    const response = await fetch(
      BASE_URL,
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
    console.log("Donor Token Data:", data);
    return data;
  } catch (error) {
    console.error('Error fetching donor token:', error);
    throw error;
  }
};

