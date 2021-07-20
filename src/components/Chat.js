import { useEffect } from "react";
import { useChat } from "context/ChatContext"; //or '../context/ChatContext' 
import { ChatEngine, ChatEngineWrapper, getChats, Socket } from "react-chat-engine";
import { ChatApp } from "./ChatApp";
import { ChatToolbar } from "./ChatToolbar";
import { ChatInput4Msg } from "./ChatInput4Msg";

export const Chat=()=> {

 // const userChat=useChat();
 // useEffect(()=>console.log(userChat),[])  //for testing
//'auth user' undefined->undefined false -> 'auth user' Im -> Im false 
//-> Object (chatConfig undefined)-> Im true
//-> object (chatConfig with userSecret projectId userName etc)
//why [userChat] infinite? snapshot?

const {myChats,setMyChats,chatConfig,selectedChat,selectChat,
  createChat_f,removeChat,setSelectedChat,removeChatHelper,createChatHelper}=useChat();
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
useEffect(()=>{console.log('whyyyyyyy')
  getChats(chatConfig,(chats)=>{console.log('getChats hehhehehhehhhheheh ',chats)
    setMyChats(chats);
  })
},[]) //why getchats is not working here at the start but works inside of <Search /> below
//if changing getmessages in chatcontext then o/p 'whyyyyy' -----------'getchats hehehehhehhh'
*/
useEffect(()=>{console.log('whyyyyyyy')
  getChats(chatConfig,(chats)=>{console.log('getChats hehhehehhehhhheheh ',chats)
    //setMyChats(chats);
  })
},[myChats]) //o/p 'whyyyyy' -----------'getchats hehehehhehhh'

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
            //getChats(chatConfig,setMyChats)//ok
            getChats(chatConfig,(chats)=>{setMyChats(chats);console.log('getChats ',chats)})//ok
          }}
          onNewChat={createChatHelper} //not createChat or createChat_f
          onDeleteChat={chat=>removeChatHelper(chat)} //not removeChat nor removeChat_f
          onNewMessage={(chatId,newmessage)=>{console.log('chatId ',chatId,'newmsg ',newmessage)
            if(selectedChat && selectedChat.id===chatId){
              setSelectedChat({...selectedChat,messages:[...selectedChat.messages,newmessage]})
            } //below for if & else
            const filteredChats=myChats.filter(_chat=>_chat.id!==chatId)
            const newMsgSelectedChat=myChats.find(_chat=>_chat.id===chatId) 
            //const newMsgSelectedChat=myChats.filter(_chat=>_chat.id===chatId)[0]
            //not necessarily const selectedChat or selectedChat.id
            const updatedChat={...newMsgSelectedChat,last_message:newmessage}
            setMyChats([...filteredChats,updatedChat].sort((a,b)=>a.id-b.id))
          }}
          />
        

        <div className='chat-container'>
          <ChatApp />
          <div className='current-chat'>
            {
            selectedChat?
            <div className='chat'>
              <ChatToolbar />
              <ChatInput4Msg />
            </div>
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
  