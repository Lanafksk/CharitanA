/**
 * Formats a JavaScript Date object into a human-readable string.
 * @param {Date|string} date - The date to format.
 * @returns {string} - Formatted date string (e.g., "January 1st, 2024").
 */
function formatDate(date) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const parsedDate = new Date(date);
    if (isNaN(parsedDate)) {
        return 'Invalid Date';
    }
    return parsedDate.toLocaleDateString('en-US', options);
}

/**
 * Formats a number into a currency string.
 * @param {number} amount - The amount to format.
 * @param {string} currency - The currency code (default is 'USD').
 * @returns {string} - Formatted currency string (e.g., "$1,000.00").
 */
function formatCurrency(amount, currency = 'USD') {
    if (typeof amount !== 'number' || isNaN(amount)) {
        return 'Invalid Amount';
    }
    return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(amount);
}

module.exports = {
    formatDate,
    formatCurrency,
};
