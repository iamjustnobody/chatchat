export const joinUsernames=(people,currentUsername)=>{
    return '@'+people.map(p=>p.person.username).filter(other=>other!==currentUsername).join(', @');//ok
    //return people.map(p=>p.person.username===currentUsername?'':'@'+p.person.username).join(', '); //not ok
};