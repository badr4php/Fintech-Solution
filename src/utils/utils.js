import { GLOBALMANAGER, MANAGER, REGULAR } from '../constants/roles';

const isGlobalManager = (roles) => {
    let globalManager = false;
    roles.forEach((role) => {
        if(role.name == GLOBALMANAGER){
            globalManager = true;
        }
    });
    return globalManager;
}
const isGroupManager = (roles) => {
    let manager = false;
    roles.forEach((role) => {
        if(role.name == MANAGER){
            manager = true;
        }
    });
    return manager;
}

const isRegularUser = (roles) => {
    let regularUser = false;
    roles.forEach((role) => {
        if(role.name == REGULAR){
            regularUser = true;
        }
    });
    return regularUser;
}

export {isGlobalManager, isGroupManager, isRegularUser}