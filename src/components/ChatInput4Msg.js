import { sendMessage } from "react-chat-engine"
import { useChat } from "context/ChatContext"
import { useState } from "react"
import { Icon } from "semantic-ui-react"


export const ChatInput4Msg=()=>{
    const {chatConfig, selectedChat}=useChat()
    const [chatInputText,setChatInputText]=useState('')

    const sendChatMsg=()=>{
        if(selectedChat && chatInputText){
            sendMessage(chatConfig,selectedChat.id,{
                text:chatInputText,
                file:[],
            });
        }
        setChatInputText('')
        /* //as in <Socket onNewMsg> in chat.js, chatId may or may not be selectedChat.id
            if(selectedChat && selectedChat.id===chatId){
              setSelectedChat({...selectedChat,messages:[...selectedChat.messages,newmessage]})
            } //below for if & else
            const filteredChats=myChats.filter(_chat=>_chat.id!==chatId)
            const newMsgSelectedChat=myChats.find(_chat=>_chat.id===chatId) 
            //const newMsgSelectedChat=myChats.filter(_chat=>_chat.id===chatId)[0]
            //not necessarily const selectedChat or selectedChat.id
            const updatedChat={...newMsgSelectedChat,last_message:newmessage}
            setMyChats([...filteredChats,updatedChat].sort((a,b)=>a.id-b.id))
          */
    }

    const {setSelectedChat,myChats,setMyChats}=useChat()

    const sendChatMsgHelper=(newmessage)=>{
        setSelectedChat({...selectedChat,messages:[...selectedChat.messages,newmessage]})
        const filteredChats=myChats.filter(_chat=>_chat.id!==selectedChat.id)
        const newMsgSelectedChat=myChats.find(_chat=>_chat.id===selectedChat.id) 
        //const newMsgSelectedChat=myChats.filter(_chat=>_chat.id===selectedChat.id)[0]
        const updatedChat={...newMsgSelectedChat,last_message:newmessage}
        setMyChats([...filteredChats,updatedChat].sort((a,b)=>a.id-b.id))
    }
    
    const sendChatMsg_f=()=>{
        if(selectedChat && chatInputText){
            sendMessage(chatConfig,selectedChat.id,{
                text:chatInputText,
                file:[],
            },sendChatMsgHelper);
        }
        setChatInputText('')
    }


    return <div className='chat-controls'>

        <div onClick={()=>console.log('hai')} className='attachment-icon'>
            <Icon name='attach' color='grey'/>
        </div>

        <input value={chatInputText} className='chat-input' placeholder='Send A Message'
        onKeyPress={e=>{if(e.key=='enter')sendChatMsg()}}
        onChange={e=>setChatInputText(e.target.value)} />

        <div onClick={sendChatMsg} className='send-message-icon'>
            <Icon name='send' color='grey'/>
        </div>

    </div>
}
//onClick={()=>sendChatMsg()} or onClick={sendChatMsg} or onClick={()=>{sendChatMsg()}} or onClick={()=>{sendChatMsg();return}}
//<div onClick={sendChatMsg_f} className='send-message-icon'>