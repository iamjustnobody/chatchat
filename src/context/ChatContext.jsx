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
        const isAdmin = chat.admin.username === chatConfig.userName;
        if(isAdmin&&window.confirm('Are you sure you wanna delete this chat as an admin')){
            deleteChat(chatConfig,chat.id);
        }else if (window.confirm('Are you sure you wanna leave this chat')){
            leaveChat(chatConfig,chat.id,(data)=>{console.log(data)}) 
            //data.person.username/avatar==chatConfig.userName/avatar
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
                console.log('snapdata ',snap.data())
                if(snap.data()!=null&&snap.data()!=undefined){
                setChatConfig({
                    userSecret:authUser.uid,
                    avatar:snap.data()?snap.data().avatar:undefined,//null ''
                    userName:snap.data()?snap.data().userName:undefined,//null '' authUser.userName,
                    projectID:'82eb0471-3c38-4528-a1d2-019da3000493',
                })}
            })
        }
    },[authUser,setChatConfig]) //setChatConfig?


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