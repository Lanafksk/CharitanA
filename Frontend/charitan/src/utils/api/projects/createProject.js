const BASE_URL = `${process.env.REACT_APP_API_BASE_URL}/client-server/projects`;

export const createProjects = async (projectData) => {
  try {
    const response = await fetch(
      `${BASE_URL}/create`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(projectData),
        credentials: 'include',
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Projects Data:", data);
    return data.projectResponse;
  } catch (error) {
    console.error('Error creating project:', error);
    throw error;
  }
};