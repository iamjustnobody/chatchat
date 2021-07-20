import {useChat} from 'context/ChatContext'
import { Search, SearchResults } from 'semantic-ui-react'
import { useEffect, useRef, useState } from 'react'
import { addPerson, getOtherPeople } from 'react-chat-engine'
import { useDebounce } from 'hooks/useDebounce'

export const SearchUsers=({ visible, closeFn })=>{
    let searchRef=useRef()
    const [loading, setLoading] =useState(false)
    const [searchTerm, setSearchTerm]=useState('') //input search bar/field
    const debounceSearchTerm=useDebounce(searchTerm,500)

    //null -> not searching 4 results
    //[]-> no results
    //[...]-> results
    const [searchResults,setSearchResults]=useState(null)

    //useEffect(()=>setSearchResults(null),[])//onclick adding new user in chattoolbar; 
    //actually when selecting chat & chattoolbar renderered

    useEffect(()=>{
        //if(visible&&searchRef) searchRef.focus(); //ok for debounceSearchTerm
        if(visible&&searchRef){
            searchRef.focus();
            if(searchTerm==''){setSearchResults(null)}
        } //ok for both searchTerm & debounceSearchTerm
    },[visible])

    const{myChats,setMyChats,chatConfig,selectedChat,setSelectedChat,}=useChat()

    const selectUser=username=>{ //front end select & add users to chats
        const filteredChats=myChats.filter(_myc=>_myc.id!==selectedChat.id)
        const updatedChat={...selectedChat,people:[...selectedChat.people,{person:{username}}]}
        setSelectedChat(updatedChat)
        setMyChats([...filteredChats,updatedChat])
        closeFn() //setSearching to false; no more searching; searchusers bar invisible
        setSearchTerm('')
    }

    const addUser=username=>addPerson(chatConfig,selectedChat.id,username,()=>selectUser(username))

    useEffect(()=>{ //for getting search results from chatengine db
        if(debounceSearchTerm){//if(searchTerm){
            setLoading(true)
            getOtherPeople(chatConfig,selectedChat.id,(chatId,data)=>{//console.log('getotherpeople ',data)
                const usernames=Object.keys(data).map(_key=>data[_key].username)
                                //.filter(_user=>_user.toLowerCase().includes(searchTerm.toLowerCase()))
                                .filter(_user=>_user.toLowerCase().includes(searchTerm.toLowerCase()))
                //console.log('usernames ',usernames)
                setSearchResults(usernames.map(_username=>({title: _username})))
                setLoading(false)
            })
        }else{
            setSearchResults(null) //for semantic
            setLoading(false); //opt
            ////closeFn()
        }
    },[debounceSearchTerm,selectedChat,chatConfig]) //[searchTerm,selectedChat,chatConfig]

    useEffect(()=>{setSearchTerm('');setSearchResults(null);setLoading(false);closeFn()},[selectedChat,chatConfig])
    ////useEffect(()=>{setSearchResults(null);setLoading(false);closeFn()},[searchTerm])
    //useEffect(()=>{if(searchTerm===''){setSearchResults(null);setLoading(false);}},[searchTerm]) ////closeFn()
    //for testing purpose
    //useEffect(()=>{if(searchTerm===''){console.log('empty',searchResults)}},[searchTerm])
    //useEffect(()=>{if(searchResults==null){console.log('huhhkjiji',searchTerm)}},[searchResults])
    
    return <div className='user-search' style={{display:visible?'block':'none'}}>
        <Search fluid onBlur={closeFn} loading={loading} value={searchTerm} placeholder='Search for users' 
                open={!!searchResults&&!loading} onSearchChange={e=>setSearchTerm(e.target.value)} 
                input={{ref:r=>{searchRef=r}}} results={searchResults}
                onResultSelect={(e,data)=>{
                    if(data.result?.title) addUser(data.result.title) //selectUser(data.result.title)
                }}/>
    </div>
}