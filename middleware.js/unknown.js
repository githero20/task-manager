const unknown = (req, res) => res.status(404).send("Route is unavailable");

module.exports = unknown;
