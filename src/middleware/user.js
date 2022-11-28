import { isGlobalManager,  isGroupManager, isRegularUser } from "../utils/utils";
import { User } from '../db/models';

export const canCreateUser = (req, res, next) => {
    const roles = req.user.roles || [];
    const groups = req.user.groups || [];
    if(isGlobalManager(roles)){
        next();
    }else if (isGroupManager(roles) && inCurrentGroup(req, groups)){
        next();
    }else{
        res.status(403).send("Access denied.");
    }
};

export const canUpdateUser = async (req, res, next) => {
    const roles = req.user.roles || [];
    const groups = req.user.groups || [];
    if(isGlobalManager(roles)){
        next();
    }
    const updatedUser = await User.findByPk(req.params.id)
    if (isGroupManager(roles) && inCurrentGroup(req, groups)){
        let inGroup = false;
        updatedUser.roles.forEach((role) => {
            if(groups.includes(role.groupId)){
                inGroup = true;
            }
        });
        if(inGroup){
            next();
        }
    }else if(isRegularUser(roles) && updatedUser.id == req.user.id ){
        next();
    }else{
        res.status(403).send("Access denied.");
    }
};

export const canListUser = async (req, res, next) => {
    const roles = req.user.roles || [];
    const groups = req.user.groups || [];
    if(isGlobalManager(roles) || isGroupManager(roles)){
        next();
    }else{
        res.status(403).send("Access denied.");
    }
};

export const canDestroyUser = async (req, res, next) => {
    const roles = req.user.roles || [];
    const groups = req.user.groups || [];
    if(isGlobalManager(roles)){
        next();
    }
    const updatedUser = await User.findByPk(req.params.id)
    if (isGroupManager(roles)){
        let inGroup = false;
        updatedUser.roles.forEach((role) => {
            if(groups.includes(role.groupId)){
                inGroup = true;
            }
        });
        if(inGroup){
            next();
        }
    }else{
        res.status(403).send("Access denied.");
    }
};

const inCurrentGroup = (req, groups) => {
    const {body} = req;
    const roles = body.roles || [];
    const invalidGroup = [];
    roles.forEach((role) => {
        console.log(roles);
        if(!groups.includes(role.groupId)){
            invalidGroup.push(role.groupId);
        }
    });
    return invalidGroup.length === 0;
}


