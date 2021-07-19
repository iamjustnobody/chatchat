import { useEffect } from "react";
import { useChat } from "context/ChatContext"; //or '../context/ChatContext' 
import { ChatEngine, ChatEngineWrapper, getChats, Socket } from "react-chat-engine";
import { ChatApp } from "./ChatApp";
import { ChatToolbar } from "./ChatToolbar";

export const Chat=()=> {

 // const userChat=useChat();
 // useEffect(()=>console.log(userChat),[])  //for testing
//'auth user' undefined->undefined false -> 'auth user' Im -> Im false 
//-> Object (chatConfig undefined)-> Im true
//-> object (chatConfig with userSecret projectId userName etc)
//why [userChat] infinite? snapshot?

const {myChats,setMyChats,chatConfig,selectedChat}=useChat();
/*useEffect(()=>{
  console.log('my chats:',myChats)
},[myChats])
//reflesh page after login
//'auth user' undefined -> undefined false -> 'auth user' Im -> Im false 
//-> 'my chats' undefined -> Im true -> my chats{[]}
//after clearing site data: 'auth user' undefined -> undefined false -> 'auth user' null -> null false
//'my chat' undefined -> null true 
//-> 'auth user' Im -> Im true -> 'my chat' undefined -> my chats{[]}
useEffect(()=>{
  console.log('my chatconfig:',chatConfig)
},[chatConfig])*/

console.log('chat',myChats,chatConfig)

/*
return (
  <div style={{height:'100%',width:'100%',display:'flex'}}>
    {(!!chatConfig)==undefined?'undefined':'defined'}
    {(!!chatConfig)==true?'undefined':'defined'}
    {!!chatConfig && <div> 
      <div>ok</div>
      <ChatEngine style={{flex:'1'}}
      userName={chatConfig.userName}
      projectID={chatConfig.projectID} 
      userSecret={chatConfig.userSecret} 
      onConnect={()=>{getChats(chatConfig,async (chats)=>{
        await setMyChats(chats)
        console.log('hi',myChats);
      }
      )}}
      />
      </div>
    }
      
      
  
  </div>
)
} */



    return (
      <div style={{height:'100%',width:'100%',display:'flex'}}>
        
        {!!chatConfig && 
        <ChatEngineWrapper>
          
          <Socket
          userName={chatConfig.userName}
          projectID={chatConfig.projectID} 
          userSecret={chatConfig.userSecret} 
          onConnect={()=>{
            //getChats(chatConfig,async (chats)=>{console.log('hi',chats,myChats);await setMyChats(chats)})
            getChats(chatConfig,setMyChats)
          }}
        
          />
        

        <div className='chat-container'>
          <ChatApp />
          <div className='current-chat'>
            {
            selectedChat?<div className='chat'><ChatToolbar /></div>
            :<div className='no-chat-selected'>
              <img src="/img/social media.png" className="start-a-conversation" alt="start a conversation" />
              Select a Chat
            </div>
            }
          </div>
        </div>
          
          
      </ChatEngineWrapper> 
      }
      </div>
    )
  } 
  

  /*
  return (
      <div style={{height:'100%',width:'100%',display:'flex'}}>
        {(!!chatConfig)==true?'undefined':'defined'}
        {(!!chatConfig)==undefined?'undefined':'defined'}
      <ChatEngineWrapper>
        {!!chatConfig && (
        
          <Socket
          userName={chatConfig.userName}
          projectID={chatConfig.projectID} 
          userSecret={chatConfig.userSecret} 
          onConnect={()=>{getChats(chatConfig,async (chats)=>{
            console.log('hihi');await setMyChats(chats);
            console.log(myChats,chats);}
          )}
        }
          />)
        }
        
        <div className='chat-container'>
          <ChatApp />
          <div className='current-chat'>
            {
            selectedChat?<></>
            :<div className='no-chat-selected'>
              <img src="/img/social media.png" className="start-a-conversation" alt="start a conversation" />
              Select a Chat
            </div>
            }
          </div>
        </div>
        
      </ChatEngineWrapper> 
      </div>
  )}
  */
  