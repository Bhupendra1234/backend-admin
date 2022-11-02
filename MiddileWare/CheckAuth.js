const jwt = require('jsonwebtoken');
module.exports = (req, res, next) => {
    if (req.method === 'OPTIONS')
        return next();
    try {
        const token = req.headers.authorization.split(' ')[1];
        if (!token) {
            throw new Error('Authendication Failed');
        }
        const Decodedtoken = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.userData = { userId: Decodedtoken.userId };
    }
    catch (err) {
        res.send(401).json({msg:"Authendication Failed!"})
    }
}