import { Formik,  Form, ErrorMessage, Field } from "formik"
import { validationSchema,defaultValues } from "./registryFormikConfig" //or 'components/registryFormikConfig' or '../components/registryFormikConfig'
import { FormField } from "../components/FormField" //'.FormField' or 'components/FormField'
import { useHistory } from "react-router"
import { useState } from "react"

export const Signup=()=> {

  const history=useHistory();
  const [serverError,setServerError]=useState('');

  const signup=({email,userName,password},{setSubmitting})=>console.log('SIgning up: ',email,userName,password);
  //const signup=(values,setSubmitting)=>console.log('SIgning up: ',values);
  //both ok

  
    return (
      <div className='auth-form'>
        <h1>Sign up</h1>
        <Formik 
        onSubmit={signup}
        validateOnMount={true}
        initialValues={defaultValues} 
        validationSchema={validationSchema}
        >
          {
            ({isValid,isSubmitting}) => (
              <Form>
                <FormField name='userName' label='User Name' />
                <FormField name='email' label='Email' type='email'/>
                <FormField name='password' label='Password' type='password' />
                <FormField name='verifyPwd' label='Verify Password' type='password' />

                <button disabled={isSubmitting||!isValid} type='submit'>SIgn Up</button>

                <div className='auth-link-container'>
                  ALready have an account? {' '}
                  <span className='auth-link' onClick={()=>{history.push('/login')}}>Log In!</span>
                </div>

              </Form>
            )
          }

        </Formik>
        
        {!!serverError && <div className='error'>{serverError}</div>}
      </div>
    )
  }
  

  //onClick={()=>{history.push('login')}} or onClick={()=>history.push('login')}
  //props.history props passed down from app route (func instead of component)
  //onSubmit={()=>console.log('submitting')} or onSubmit={()=>{console.log('submitting')}
  /*
  {({isValid,isSubmitting})=>{
            return <Form> //return opt
              <label>
                Username
                <Field type='text' name='userName' />
                <ErrorMessage component='div' name='userName' className='error' />
              </label>
            </Form>
          }}
          {({isValid,isSubmitting})=>(
            <Form>
              <label>
                Username
                <Field type='text' name='userName' />
                <ErrorMessage component='div' name='userName' className='error' />
              </label>
            </Form>
          )}
          {({isValid,isSubmitting})=>{
            return (
            <Form>
              <label>
                Username
                <Field type='text' name='userName' />
                <ErrorMessage component='div' name='userName' className='error' />
              </label>
            </Form>)
          }}
  */