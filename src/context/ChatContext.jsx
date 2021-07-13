import { createContext,useState } from 'react'; //'istanbul-lib-report'
import {fb} from 'service/firebase'
import {deleteChat, getMessages, leaveChat, newChat} from 'react-chat-engine'


export const ChatContext=createContext();

export const ChatProvider = ({children,authUser})=>{

    const [myChats,setMyChats]=useState();
    const [chatConfig,setChatConfig]=useState();
    const [selectedChat,setSelectedChat]=useState();
    //all inittially undefined

    const createChat = () =>{
        newChat(chatConfig,{title:''});
    }

    const removeChat = chat => {
        const isAdmin = chat.admin === chatConfig.userName;
        if(isAdmin&&window.confirm('Are you are you wanna delete this chat')){
            deleteChat(chatConfig,chat.id);
        }else if (window.confirm('Are you are you wanna delete this chat')){
            leaveChat(chatConfig,chat.id,chatConfig.userName)
        }
    }

    const selectChat = chat => {
        getMessages(chatConfig,chat.id,messages=>{ //cb fn
            setSelectedChat({
                ...chat,
                messages,
            })
        })
    }



    //to setChatConfig once authuser has initialised

    return (
        <ChatContext.Provider 
            value={
                {
                    myChats,setMyChats,
                    chatConfig,setChatConfig,
                    selectChat,setSelectedChat,
                    selectChat,createChat,removeChat,
                }
            }> 
            {children}
        </ChatContext.Provider>
    )
}

//all of states & funcs shared with children 