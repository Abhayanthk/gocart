const jwt = require('jsonwebtoken');

const generateToken = (user, role = "user") => {
    return jwt.sign(
        {
            id: user.id,
            email: user.email,
            username: user.username || user.name || "FK",
            fullName: user.fullName || user.name,
            role: role
        },
        process.env.JWT_SECRET,
        {
            expiresIn: '30d',
        }
    );
}
module.exports = { generateToken };