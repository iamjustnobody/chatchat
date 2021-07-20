import { createContext,useContext,useEffect,useState } from 'react'; //'istanbul-lib-report'
import {fb} from 'service/firebase'
import {deleteChat, getMessages, leaveChat, newChat} from 'react-chat-engine'


export const ChatContext=createContext();

export const ChatProvider = ({children,authUser})=>{

    console.log('provider ',authUser)

    const [myChats,setMyChats]=useState();
    const [chatConfig,setChatConfig]=useState();
    const [selectedChat,setSelectedChat]=useState();
    //all inittially undefined

    const createChat = () =>{
        newChat(chatConfig,{title:''});
    }
    const createChat_f = () =>{
        /*newChat(chatConfig,{title:''},(chatData)=>{
            if(chatData.admin.username===chatConfig.userName) selectChat(chatData)
            setMyChats([...myChats,chatData].sort((a,b)=>a.id-b.id))
        });*/ //ok
        newChat(chatConfig,{title:''},createChatHelper);//ok
        //newChat(chatConfig,{title:''},(chatData)=>createChatHelper(chatData));//ok
        //newChat(chatConfig,{title:''},(chatData)=>{createChatHelper(chatData)});//ok
        //newChat(chatConfig,{title:''},(chatData)=>{createChatHelper(chatData);return});//ok or return; ok
    }

    const createChatHelper=(chatData)=>{
        if(chatData.admin.username===chatConfig.userName) selectChat(chatData)
        setMyChats([...myChats,chatData].sort((a,b)=>a.id-b.id))
    }

    const removeChat = chat => {
        const isAdmin = chat.admin.username === chatConfig.userName;
        if(isAdmin&&window.confirm('Are you sure you wanna delete this chat as an admin')){
            deleteChat(chatConfig,chat.id);
        }else if (window.confirm('Are you sure you wanna leave this chat')){
            leaveChat(chatConfig,chat.id);
        }
    }

    const removeChat_f = chat => {
        const isAdmin = chat.admin.username === chatConfig.userName;
        if(isAdmin&&window.confirm('Are you sure you wanna delete this chat as an admin')){
            //deleteChat(chatConfig,chat.id,data=>console.log(data));
            deleteChat(chatConfig,chat.id,removeChatHelper)
        }else if (window.confirm('Are you sure you wanna leave this chat')){
            //leaveChat(chatConfig,chat.id,chatConfig.userName);
            //leaveChat(chatConfig,chat.id,(data)=>{console.log(data)}) 
            //data.person.username/avatar==chatConfig.userName/avatar

            leaveChat(chatConfig,chat.id,removeChatHelper)
        }
    }

    const removeChatHelper=(chatData)=>{
        if(selectedChat?.id===chatData.id) setSelectedChat(null)
        setMyChats(myChats.filter(_myc=>_myc.id!==chatData.id).sort((a,b)=>a.id-b.id))
    }

    const selectChat = chat => {
        getMessages(chatConfig,chat.id,(chatId,messages)=>{ //cb fn
            console.log('getmessages ',messages)
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
            .onSnapshot(snap=>{//.get().then(snap=>{
                console.log('snapdata ',snap.data())
                if(snap.data()!=null&&snap.data()!=undefined){//snap.data()!=undefined -> snap.exists
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
                    createChat_f,createChatHelper,removeChatHelper,removeChat_f,
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
        createChat_f,createChatHelper,removeChatHelper,removeChat_f,
    }=useContext(ChatContext);

    return {
        myChats,setMyChats,
        chatConfig,setChatConfig,
        selectedChat,setSelectedChat,
        selectChat,createChat,removeChat,
        createChat_f,createChatHelper,removeChatHelper,removeChat_f,
    } //return a single obj
}