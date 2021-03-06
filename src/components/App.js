import { useEffect } from "react"
import {fb} from 'service/firebase' //if baseurl in jsconfig // normally if not, then '../service/firebase' ok
import { Switch,Route } from "react-router"
import {Login} from './Login' //== '../components/Login'  // if baseurl in jsconfig, 'components/Login' ok then
import { Signup } from "./Signup"
import { Chat } from "./Chat"

import { useAuth } from "hooks/useAuth"
import { useResolved } from "hooks/useResolved"
import { useHistory } from "react-router-dom"

import {useChat} from 'context/ChatContext'
import { ChatProvider } from "context/ChatContext"

import 'semantic-ui-css/semantic.min.css'

export const App=()=> {
  const history=useHistory();

  //const authObj=useAuth(); const authUser=authObj.authUser;
  const {authUser}=useAuth();
  //both ok

  useEffect(()=>{
    console.log('auth user', authUser)
  },[authUser])

  console.log('b4 authrosolved')
  const authResolved =useResolved(authUser)
  console.log('after authrosolved')

  useEffect(()=>{
    console.log(authUser,authResolved)
  },[authUser,authResolved])


// so when first loading /login page, auth use undefined->undefined false 
//-> auth use null -> null false -> null true
//->auth user (actual user xxx) -> (actual user xxx) true
useEffect(()=>{
  if(authResolved){
    history.push(!!authUser?'/':'/login');
  }
},[authResolved,authUser,history]) //?history dep

  /*useEffect(()=>{
    fb.firestore.collection('chatUsers').where('userName','==','dummy').get().then(res=>{
      const users=res.docs
      const user=users[0]?.data()
      console.log(user)
    })
  },[])*/ //for initial test


/*
  return (
    <div className='app'>
      <Switch>
        <Route exact path='/' component={Chat}></Route>
        <Route path='/login' component={Login}></Route>
        <Route path='/signup' component={Signup}></Route>
        <Route path='/' component={Login}></Route>
      </Switch>
    </div>
  )*/

  return authResolved?(
    <ChatProvider authUser={authUser}>
      <div className='app'>
        <Switch>
          <Route exact path='/' component={Chat}></Route>
          <Route path='/login' component={Login}></Route>
          <Route path='/signup' component={Signup}></Route>
          <Route path='/' component={Login}></Route>
        </Switch>
      </div>
    </ChatProvider>
  ):(<>Loading...</>)

}






//export const App=()=> <>hello</>

/*
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
*/
