import { useEffect } from "react";
import { useChat } from "context/ChatContext"; //or '../context/ChatContext' 
import { ChatEngine, ChatEngineWrapper, Socket } from "react-chat-engine";

export const Chat=()=> {

 // const userChat=useChat();
 // useEffect(()=>console.log(userChat),[])  //for testing
//'auth user' undefined->undefined false -> 'auth user' Im -> Im false 
//-> Object (chatConfig undefined)-> Im true
//-> object (chatConfig with userSecret projectId userName etc)
//why [userChat] infinite? snapshot?

const {myChats,setMyChats,chatConfig,selectedChat}=useChat();
useEffect(()=>{
  console.log('my chats:',myChats)
},[myChats])
//'auth user' undefined -> undefined false -> 'auth user' Im -> Im false 
//-> 'my chats' undefined -> Im true

    return (
      <div>
        {!!chatConfig && 
        <ChatEngineWrapper>
          <Socket 
          userName={chatConfig.userName}
          projectID={chatConfig.projectID} 
          userSecret={chatConfig.userSecret} 
        />
        </ChatEngineWrapper>
        }
      </div>
    )
  }
  