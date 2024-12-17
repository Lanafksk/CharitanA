const categoryService = require('./categoryService');

// Create a new category
exports.createCategory = async (req, res) => {
    try {
        const category = await categoryService.createCategory(req.body);
        res.status(201).json(category);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Get all categories
exports.getAllCategories = async (req, res) => {
    try {
        const categories = await categoryService.getAllCategories();
        res.status(200).json(categories);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get a category by ID
exports.getCategoryById = async (req, res) => {
    try {
        const category = await categoryService.getCategoryById(req.params.id);
        if (!category) return res.status(404).json({ error: 'Category not found' });
        res.status(200).json(category);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Update a category
exports.updateCategory = async (req, res) => {
    try {
        const category = await categoryService.updateCategory(req.params.id, req.body);
        if (!category) return res.status(404).json({ error: 'Category not found' });
        res.status(200).json(category);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Delete a category
exports.deleteCategory = async (req, res) => {
    try {
        const category = await categoryService.deleteCategory(req.params.id);
        if (!category) return res.status(404).json({ error: 'Category not found' });
        res.status(200).json({ message: 'Category deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};