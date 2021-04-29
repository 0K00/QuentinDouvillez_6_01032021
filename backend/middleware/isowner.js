const Sauce = require('../models/sauce');

module.exports = async (req, res, next) => {
    try {
        const sauce = await Sauce.findOne({ _id: req.params.id })
        if (sauce.userId !== req.user) {
            res.status(401).json({ message: "Unauthorized" });
            return sauce;
        }
        next();
    } catch {
            res.status(401).json({ error: new Error('Invalid request!') });
    }
};