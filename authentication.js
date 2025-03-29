const VALID_API_KEY = "secret123";  // Replace with your actual key

function authenticate(req, res, next) {
    console.log("Received Headers:", req.headers); 

    const apiKey = req.headers["x-api-key"];
    if (!apiKey) {
        return res.status(403).json({ error: "Missing API Key" });
    }

    if (apiKey !== VALID_API_KEY) {
        return res.status(403).json({ error: "Invalid API Key" });
    }

    next();
}


module.exports = authenticate;
