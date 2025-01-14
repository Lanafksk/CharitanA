const ProjectDTO = require('../project/projectDTO'); // Assuming the DTO class is in ProjectDTO.js
const { redisInstance } = require('./redisConfig');

// Function to cache the ProjectDTO in Redis
exports.cacheProject = async (projectDTO) => {
    // Serialize the ProjectDTO instance
    const projectJSON = JSON.stringify(projectDTO);
    const projectKey = `project:${projectDTO.project_id}`;

    // Write to the master Redis instance
    try {
        const result = await redisInstance.set(projectKey, projectJSON);
        if (result === 'OK') {
            console.log('Project cached successfully:', projectKey);
        }
    } catch (err) {
        console.error('Error writing to Redis master:', err);
    }
};

const getProject = async (projectKey) => {
    try {
        const data = await redisInstance.GET('project:' + projectKey);

        if (data != null) {
            console.log('Data found in cache:', data);
            const projectData = JSON.parse(data);
            return new ProjectDTO(projectData);
        } else {
            console.log('No data found in cache');
            return null;
        }
    } catch (err) {
        throw new Error(`Error reading from Redis: ${err}`);
    }
};


// Method to check and cache projects
exports.returnCacheProject = async (projectId) => {
    try {
        // Check Redis for the cached project
        console.log('Checking cache for project:', projectId);
        const cachedProject = await getProject(projectId);

        if (cachedProject != null) {
            return cachedProject; // Return the cached project
        } else {
            return null; // No cached project found
        }
    } catch (error) {
        console.error('Error checking and caching project:', error);
        throw error;
    }
}

// Method to delete a cached project
exports.deleteCacheProject = async (projectId) => {
    try {
        const result = await redisInstance.del('project:' + projectId);
        if (result === 1) {
            console.log('Project deleted from cache:', projectId);
            return true;
        } else {
            console.log('Project not found in cache:', projectId);
            return true;
        }
    } catch (err) {
        console.error('Error deleting project from cache:', err);
        return false;
    }
}