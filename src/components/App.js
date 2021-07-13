import { useEffect } from "react"
import {fb} from 'service/firebase' //if baseurl in jsconfig // normally if not, then '../service/firebase' ok
import { Switch,Route } from "react-router"
import {Login} from './Login' //== '../components/Login'  // if baseurl in jsconfig, 'components/Login' ok then
import { Signup } from "./Signup"
import { Chat } from "./Chat"

import { useAuth } from "hooks/useAuth"
import { useResolved } from "hooks/useResolved"
import { useHistory } from "react-router-dom"

export const App=()=> {
  const history=useHistory();

  //const authObj=useAuth(); const authUser=authObj.authUser;
  const {authUser}=useAuth();
  //both ok

  useEffect(()=>{
    console.log('auth user', authUser)
  },[authUser])

  const authResolved =useResolved(authUser)

  useEffect(()=>{
    console.log(authUser,authResolved)
  },[authUser,authResolved])


// so when first loading /login page, auth use undefined->undefined false -> auth use null -> null false -> null true
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


  return (
    <div className='app'>
      <Switch>
        <Route exact path='/' component={Chat}></Route>
        <Route path='/login' component={Login}></Route>
        <Route path='/signup' component={Signup}></Route>
        <Route path='/' component={Login}></Route>
      </Switch>
    </div>
  )
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
