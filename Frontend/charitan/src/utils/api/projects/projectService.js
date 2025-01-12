const API_BASE_URL = 'http://localhost:3001/api';

export const fetchProjects = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/projects`);
    if (!response.ok) {
      throw new Error('Failed to fetch projects');
    }
    return await response.json();
  } catch (error) {
    // We throw the error to handle it in the component
    throw new Error(`Error fetching projects: ${error.message}`);
  }
};