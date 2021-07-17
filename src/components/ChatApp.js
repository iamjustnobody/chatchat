import {useResolved} from 'hooks/useResolved'
import { useChat } from 'context/ChatContext'
import { Loader } from 'semantic-ui-react'
import { ChatList } from './ChatList'

export const ChatApp=()=>{

    const {myChats,createChat,chatConfig}=useChat()
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