import jwt from 'jsonwebtoken';

export const generateToken = (user) => {
    return jwt.sign(
        {
            id: user.id,
            email: user.email,
            username: user.username,
            fullName: user.fullName,
        },
        process.env.JWT_SECRET,
        {
            expiresIn: '30d',
        }
    );
}