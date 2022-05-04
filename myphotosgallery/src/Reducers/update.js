export default function(update = false, action){
    if(action.type === "update"){
        return action.update;
    } else if(action.type === "updateDone"){
        return action.update;
    } else return update;
}