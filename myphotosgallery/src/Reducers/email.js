export default function(email = "", action){
    if(action.type === "addEmail"){
        return action.email;
    } else return email;
}