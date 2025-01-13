const BASE_URL = `${process.env.REACT_APP_API_BASE_URL}/client-server/projects`;

export const fetchProjects = async () => {
  try {
    const response = await fetch(
      BASE_URL,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        //credentials: 'include',
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Projects Data:", data);
    return data.projectResponse;
  } catch (error) {
    console.error('Error fetching projects:', error);
    throw error;
  }
};