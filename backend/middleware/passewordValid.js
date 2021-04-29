const passwordSchema = require('../models/password');

module.exports = (req, res, next) => {
    if (!passwordSchema.validate(req.body.password)) {
        res.writeHead(400, '{"message":"Password required: 8 characters minimum. At least 1 uppercase, 1 lowercase. Without spaces"}', {
            'content-type': 'application/json'
        });
        res.end('Incorrect password format');
    } else {
        next();
    }
};