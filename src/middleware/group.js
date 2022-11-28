import { isGlobalManager } from "../utils/utils";

export const canManageGroup = (req, res, next) => {
    const roles = req.user.roles || [];
    console.log(roles);
    if(isGlobalManager(roles)){
        next();
    }else{
        res.status(403).send("Access denied.");
    }
};


