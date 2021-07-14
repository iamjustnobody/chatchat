import { createContext,useContext,useEffect,useState } from 'react'; //'istanbul-lib-report'
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
    useEffect(()=>{
        if(authUser){
            fb.firestore
            .collection('chatUsers')
            .doc(authUser.uid)
            .onSnapshot(snap=>{
                setChatConfig({
                    userSecret:authUser.uid,
                    avatar:snap.data().avatar,
                    userName:snap.data().userName,
                    projectID:'82eb0471-3c38-4528-a1d2-019da3000493',
                })
            })
        }
    })


    return (
        <ChatContext.Provider 
            value={
                {
                    myChats,setMyChats,
                    chatConfig,setChatConfig,
                    selectedChat,setSelectedChat,
                    selectChat,createChat,removeChat,
                }
            }> 
            {children}
        </ChatContext.Provider>
    )
}

//all of states & funcs shared with children 

export const useChat=()=>{
    const {
        myChats,setMyChats,
        chatConfig,setChatConfig,
        selectedChat,setSelectedChat,
        selectChat,createChat,removeChat,
    }=useContext(ChatContext);

    return {
        myChats,setMyChats,
        chatConfig,setChatConfig,
        selectedChat,setSelectedChat,
        selectChat,createChat,removeChat,
    } //return a single obj
}