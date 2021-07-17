export const notMe=(chatConfig,selectedChat)=>{
    //selectedChat.people.map(p=>console.log('chatmember '+p.username+ p.person.username))
    //console.log(chatConfig.userName)
    //return selectedChat.people.find(chatMember=>chatMember.person.username!==chatConfig.userName)?.person?.username;
    return selectedChat.people.filter(p=>p.person.username!==chatConfig.userName)[0]?.person?.username
    //both ok
}