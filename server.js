const express = require('express');
const cors = require('cors');
const { translateNLToSQL, explainQuery, validateQuery } = require('./queryProcessor');
const authenticate = require('./authentication');

const app = express();
app.use(cors());
app.use(express.json());

app.post("/query", authenticate, (req, res) => {
    res.json({ sql: translateNLToSQL(req.body.nl_query) });
});

app.get("/explain", (req, res) => {
    const nl_query = req.query.nl_query;  

    if (!nl_query) {
        return res.status(400).json({ error: "Missing 'nl_query' parameter" });
    }

    const result = explainQuery(nl_query);
    res.json(result);
});


app.post("/validate", authenticate, (req, res) => {
    res.json({ valid: validateQuery(req.body.nl_query) });
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
