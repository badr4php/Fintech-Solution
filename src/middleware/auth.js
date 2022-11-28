import jwt from 'jsonwebtoken';
const auth = (req, res, next) => {
    try {
        const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(' ')[1]
        if (!token) return res.status(403).send("Access denied.");

        const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
        decoded.groups = getGroups(decoded.roles);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(400).send("Invalid token");
    }
};

const getGroups = (roles) => {
    const groups = roles.map(item => {
        return item.groupId;
    })
    return groups;
}


export default auth;