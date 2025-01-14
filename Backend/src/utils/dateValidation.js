exports.isValidDate = (date) => {
    return new Date(date) !== "Invalid Date" && !isNaN(new Date(date));
};