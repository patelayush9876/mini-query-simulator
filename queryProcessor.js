/**
 * Converts a natural language query into an SQL query.
 * @param {string} nlQuery - Natural language query.
 * @returns {string} - Translated SQL query.
 */
function translateNLToSQL(nlQuery) {
    if (!nlQuery || typeof nlQuery !== "string") {
        return "Invalid input.";
    }

    nlQuery = nlQuery.toLowerCase();

    if (nlQuery.includes("all orders above")) {
        return "SELECT * FROM orders WHERE amount > 1000;";
    } else if (nlQuery.includes("all customers")) {
        return "SELECT * FROM customers;";
    } else if (nlQuery.includes("latest orders")) {
        return "SELECT * FROM orders ORDER BY order_date DESC LIMIT 10;";
    }

    return "Query not understood.";
}

/**
 * Explains what an SQL query does.
 * @param {string} nlQuery - Natural language query.
 * @returns {string} - Explanation of the query.
 */
function explainQuery(nlQuery) {
    if (!nlQuery || typeof nlQuery !== "string") {
        return "Invalid query.";
    }

    nlQuery = nlQuery.toLowerCase();

    if (nlQuery.includes("all orders above")) {
        return "This query retrieves all orders where the amount is greater than $1000.";
    } else if (nlQuery.includes("all customers")) {
        return "This query retrieves a list of all customers.";
    } else if (nlQuery.includes("latest orders")) {
        return "This query fetches the latest 10 orders sorted by order date.";
    }

    return "No explanation available for this query.";
}

/**
 * Validates if the given query is recognized.
 * @param {string} nlQuery - Natural language query.
 * @returns {boolean} - True if valid, otherwise false.
 */
function validateQuery(nlQuery) {
    const sql = translateNLToSQL(nlQuery);
    return sql !== "Query not understood.";
}

module.exports = { translateNLToSQL, explainQuery, validateQuery };
