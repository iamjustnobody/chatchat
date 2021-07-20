import { useChat } from "context/ChatContext"
import { Icon } from "semantic-ui-react"
import { ChatApp } from "./ChatApp"
import { notMe } from "helpers/notMe"
import { joinUsernames } from "helpers/joinUsernames"
import { ChatAvatar } from "./ChatAvatar"
import { useEffect } from "react"


export const ChatList=()=>{
    const {myChats,chatConfig,selectedChat,selectChat,removeChat,removeChatHelper,removeChat_f}=useChat()
    useEffect(()=>{console.log('selectedchat changed ',selectedChat)},[selectedChat])

    return (
        <div className='chat-list'>
            {myChats.map((_mychat,_index)=>(
                <div key={_index}
                className={`chat-list-item ${selectedChat?.id===_mychat.id?'selected-chat-item':''}`}>

                    <div className='chat-list-item-content' onClick={()=>selectChat(_mychat)}>
                        {_mychat.people.length===1?(
                            <>
                                <Icon circular inverted color='violet' name='user cancel' />
                                <div className='chat-list-preview'>
                                    <div className='preview-username'>No One Added Yet</div>
                                </div>
                            </>
                        ):(_mychat.people.length===2?<>
                            <ChatAvatar username={notMe(chatConfig,_mychat)} chat={_mychat}></ChatAvatar>
                            <div className='chat-list-preview'>
                                <div className='preview-username'>{notMe(chatConfig,_mychat)}</div>
                                <div className='preview-message'>
                                    {_mychat.last_message.attachments.length?
                                    `${_mychat.last_message.sender.username} send an attachment`
                                    :(_mychat.last_message.text.slice(0,15)+'...')}
                                </div>
                            </div>
                        </>
                        :<>
                            <Icon circular inverted color='brown' name='users' />
                            <div className='preview-username'>{joinUsernames(_mychat.people,chatConfig.userName).slice(0,15)+'...'}</div>
                            <div className='preview-message'>
                                {_mychat.last_message?.attachments.length?
                                `${_mychat.last_message?.sender.username} send an attachment`
                                :(_mychat.last_message?.text.slice(0,15)+'...')}
                            </div>
                        </>
                        )}
                    </div>


                    <div onClick={()=>removeChat(_mychat)} className='chat-item-delete'>
                        <Icon name='delete' />
                    </div>
                    

                </div>
            ))}
        </div>
    )
}
//<div onClick={()=>removeChat_f(_mychat)} className='chat-item-delete'><Icon name='delete' /></div>
//removeChat -> db chatengine io ; removeChatHelper -> front end diaplay/presentation -> onDelete in <Search>
//removeChat_f -> both (above) combined
//removeChat_f in div onclick + <Search ondelete={removechathelper}> = fe twice
//removeChat in div onclick + <Search ondelete=rmhelper> or removeChat_f in div onclick + <Search> = fe once
//removeChat/rmchat_f in div onclick + <Search ondelete=rmchat_f/rmchat> -> fe 0-2 times db error

//onClick={()=>{console.log('select this chat',_mychat);selectChat(_mychat)}}