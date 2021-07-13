import { ErrorMessage, Field } from "formik"

export const FormField =({name,label,type='text'})=>(  //deconstruct props
    <label>
        {label}
        <Field type={type} name={name} />
        <ErrorMessage component='div' name={name} className='error' />
    </label>
)
//NOT ()=>{<label></label} 
//()=>{return <label></label>} or ()=>(<label></label>)
//or ()=>{return (<label></label>)}