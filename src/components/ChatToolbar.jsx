import {useState} from 'react'
import {useChat} from 'context/ChatContext'
import { Icon } from 'semantic-ui-react'
import { joinUsernames } from 'helpers/joinUsernames'
import { SearchUsers } from './SearchUsers'


export const ChatToolbar=()=>{

    const {selectedChat,chatConfig}=useChat()
    const [searching, setSearching]=useState(false)

    return (
        <>
            <div className='chat-toolbar'>
                <div className='chat-header-text'>
                    {joinUsernames(selectedChat.people,chatConfig.userName).slice(0,100)}
                </div>

                <div className="add-user-icon">
                    <Icon color="grey" name="user plus" onClick={()=>setSearching(true)}/>
                </div>
            </div>

            <SearchUsers visible={searching} closeFn={()=>setSearching(false)}/>
        </>
    )
}
//{!!searching && <div>hello</div>}