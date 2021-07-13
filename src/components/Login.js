import { Formik,Form } from "formik"
import { defaultValues,validationSchema } from "./loginFormikConfig" //or 'components/loginFormikConfig' or '../components/loginFormikConfig'
import { FormField } from "../components/FormField"; //or './FormField' or 'components/FormField'
import { useHistory } from "react-router-dom";
import { useState } from "react";
import { fb } from "service/firebase";

export const Login=()=> {
    const history=useHistory()
    const [serverError,setServerError]=useState('');

  //const login=({email,password},{setSubmitting})=>console.log('log in: ',email,password);
  //const login=(values,setSubmitting)=>console.log('log in: ',values);
  //both ok

  const login=({email,password},{setSubmitting})=>{

    fb.auth.signInWithEmailAndPassword(email,password)
    .then(res=>{
      if(!res.user){
        setServerError('Cannot log you in. Please try again.')
      }
    }) //already handle redirect pages in app.js
    .catch(err=>{
      if(err.code==='auth/wrong-password'){
        setServerError('Invalid credential')
      }else if(err.code==='auth/user-not-found'){
        setServerError('No account for this email')
      }else{
        setServerError('SOmething went wrong')
      }
    })
    .finally(()=>setSubmitting(false))


  }



    return (
      <div className='auth-form'>
        <h1>Login</h1>

        <Formik 
        onSubmit={login}
        validateOnMount={true}
        initialValues={defaultValues} 
        validationSchema={validationSchema}
        >
          {
            ({isValid,isSubmitting}) => (
              <Form>
                <FormField name='email' label='Email' type='email'/>
                <FormField name='password' label='Password' type='password' />

                <button disabled={isSubmitting||!isValid} type='submit'>Log In</button>

                <div className='auth-link-container'>
                  Don't have an account? {' '}
                  <span className='auth-link' onClick={()=>{history.push('/signup')}}>Sign Up!</span>
                </div>

              </Form>
            )
          }

        </Formik>
        
        {!!serverError && <div className='error'>{serverError}</div>}

      </div>
    )
  }
  