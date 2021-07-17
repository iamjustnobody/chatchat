import { useChat } from "context/ChatContext"
import { notMe } from "helpers/notMe";
import { useEffect, useState } from "react";
import { fb } from "service/firebase";
import { Image } from "semantic-ui-react";


export const ChatAvatar=({chat,username,className})=>{
    const {chatConfig}=useChat();
    const {avatar,setAvatar}=useState('');

    useEffect(()=>{
        fb.firestore.collection('chatUsers')
        .where('userName',"==",username) //username===notMe(chatConfig,chat)
        .get()
        .then(snap=>{
            const resDocData=snap.docs[0]?.data()
            if(resDocData?.avatar)setAvatar(resDocData.avatar) //if not empty string if exists
        })
    },[username,chat,chatConfig])

    return avatar?
    <Image className={className||'chat-list-avatar'} src={avatar} />
    :<div className={className||'empty-avatar'}>
        {notMe(chatConfig,chat)[0].toUpperCase()}
    </div>
}