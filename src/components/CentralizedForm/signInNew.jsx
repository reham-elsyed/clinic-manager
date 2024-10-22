import React, { useEffect } from 'react';
import { useState } from 'react';
import { useFormik } from 'formik';  // We use Formik to manage form state and validation
import { formConfigurations } from './CentralizedInput'; 
import InputField from './CentralizedInput';
import { useParams, useNavigate} from 'react-router-dom';
import {useLogin} from '../Login/Login';
import useSignup from '../SignupHook/SignupHook';
function DynamicForm() {
  // Initialize Formik with initial values and submit handler
const[fields, setFields]= useState([])
const navigate = useNavigate()
  const {formtype} = useParams();
  const signup = useSignup()
const login = useLogin()
  useEffect(() => {
    if (formConfigurations[formtype]) {
      setFields(formConfigurations[formtype]);
    } else {
      setFields([]);  // If formtype doesn't exist, reset fields to an empty array
    }
  }, [formtype]);
  const initialValues = (formtype)=>{
    if(formtype ==='login'){
    return {
    name: '',
    email: '',
    password: '',
   
  }
    }else{
    return {
            name:"",
            email:"",
            password:"",
            rePassword:"",
            role:'user'
          }
    }
  }
  const formik = useFormik({
    initialValues: initialValues(),
    onSubmit: values => {
      console.log('Form Values', values); 
      if (formtype=== 'login'){
        login(values);
      }else{
signup(values)
      }
    }
  });  
 
  return (
    <div className="px-5 py-4 flex justify-center items-center flex-col">
      <div className="text-start flex justify-center items-center flex-col border-2 p-3 w-2/3 lg:w-3/4 xl:w-1/2 input-bordered">
        <h2>{formtype === 'login' ? 'Login Now' : 'Sign Up Now'}</h2>
        <form className="w-full" onSubmit={formik.handleSubmit}>
          {fields.map(field => (
            <InputField key={field.id} {...field} formik={formik} />
          ))}
          <div className="card-actions pt-5">
            <button type="submit" className="btn btn-primary">
              {formtype === 'login' ? 'Login' : 'Sign Up'}
            </button>
          </div>
        </form>
        <div className="divider m-0"></div>
        <div className="card-actions pt-5">
          {formtype === 'login' ? (
            <>
              <p>Don't have an account?</p>
              <button onClick={() => navigate('/form/signup')} className="btn btn-primary">
                Sign Up
              </button>
            </>
          ) : (
            <>
              <p>Already have an account?</p>
              <button onClick={() => navigate('/form/login')} className="btn btn-primary">
                Login
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default DynamicForm;
