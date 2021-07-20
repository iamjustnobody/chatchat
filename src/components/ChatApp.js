import {useResolved} from 'hooks/useResolved'
import { useChat } from 'context/ChatContext'
import { Loader } from 'semantic-ui-react'
import { ChatList } from './ChatList'

export const ChatApp=()=>{

    const {myChats,createChat,chatConfig,createChat_f}=useChat()
    console.log('chatapp',myChats,chatConfig)
    const chatResolved=useResolved(myChats)

    return <div className="left-rail">
        {chatResolved?(
            <>
                {!!myChats.length?<div className='chat-list-container'>
                    <ChatList />
                </div>
                :<div className='chat-list-container no-chats-yet'>
                    <h3>No Chats Yet</h3>
                </div>}

                <button className='create-chat-button' onClick={createChat}>
                    Create A Chat
                </button>
            </>
        ):(
            <div className='chats-loading'>
                <Loader active size='huge'/>
            </div>
        )}
    </div>
}
//<button className='create-chat-button' onClick={createChat_f}>Create A Chat</button>
//more re-render; as <Search onNewChat> covers createChatHelper for frontend presentation;
//createChat_f=createChat(chatengineio db)+createChatHelper (fe display)
//button onClick={createChat_f} + <Search onNewChat createChatHelper> -> fe twice
//button onClick={createChat} or <Search> -> fe once
//button onClick={createChat_f/createChat} + <Search onNewChat createChat or createChat_f>->db twice & fe 1-2 times
