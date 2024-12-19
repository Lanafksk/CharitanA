const categoryRepository = require('./categoryRepository');

// Create a new category
exports.createCategory = async (categoryData) => {
    return await categoryRepository.createCategory(categoryData);
};

// Get all categories
exports.getAllCategories = async () => {
    return await categoryRepository.getAllCategories();
};

// Get a category by ID
exports.getCategoryById = async (categoryId) => {
    return await categoryRepository.getCategoryById(categoryId);
};

// Update a category
exports.updateCategory = async (categoryId, categoryData) => {
    return await categoryRepository.updateCategory(categoryId, categoryData);
};

// Delete a category
exports.deleteCategory = async (categoryId) => {
    return await categoryRepository.deleteCategory(categoryId);
};