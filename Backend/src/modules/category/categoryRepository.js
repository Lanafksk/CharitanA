const Category = require('./categoryModel');

// Create a new category
exports.createCategory = async (categoryData) => {
    const category = new Category(categoryData);
    return await category.save();
};

// Get all categories
exports.getAllCategories = async () => {
    return await Category.find();
};

// Get a category by ID
exports.getCategoryById = async (categoryId) => {
    return await Category.findOne({category_id: categoryId});
};

// Update a category
exports.updateCategory = async (categoryId, categoryData) => {
    return await Category.findOneAndUpdate({ category_id: categoryId }, categoryData, { new: true });
};

// Delete a category
exports.deleteCategory = async (categoryId) => {
    return await Category.findOneAndDelete({ category_id: categoryId });
};