import { Formik,Form } from "formik"
import { defaultValues,validationSchema } from "./loginFormikConfig" //or 'components/loginFormikConfig' or '../components/loginFormikConfig'
import { FormField } from "../components/FormField"; //or './FormField' or 'components/FormField'
import { useHistory } from "react-router-dom";
import { useState } from "react";

export const Login=()=> {
    const history=useHistory()
    const [serverError,setServerError]=useState('');

  const login=({email,password},{setSubmitting})=>console.log('log in: ',email,password);
  //const login=(values,setSubmitting)=>console.log('log in: ',values);
  //both ok


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
  