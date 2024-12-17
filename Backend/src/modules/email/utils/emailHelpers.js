const moment = require('moment');

function formatDate(date) {
    return moment(date).format('MMMM Do, YYYY');
}

function formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
}

module.exports = {
    formatDate,
    formatCurrency,
};