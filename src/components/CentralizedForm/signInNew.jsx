import React, { useEffect } from 'react';
import { useState } from 'react';
import { useFormik } from 'formik';  // We use Formik to manage form state and validation
import { formConfigurations } from './CentralizedInput';
import InputField from './CentralizedInput';
import { useParams, useNavigate } from 'react-router-dom';
import { useLogin } from '../Login/Login';
import useSignup from '../SignupHook/SignupHook';
function DynamicForm() {
  // Initialize Formik with initial values and submit handler
  const [fields, setFields] = useState([])
  const navigate = useNavigate()
  const { formtype } = useParams();
  const signup = useSignup()
  const login = useLogin()
  useEffect(() => {
    if (formConfigurations[formtype]) {
      setFields(formConfigurations[formtype]);
    } else {
      setFields([]);  // If formtype doesn't exist, reset fields to an empty array
    }
  }, [formtype]);
  const initialValues = (formtype) => {
    if (formtype === 'login') {
      return {
        name: '',
        email: '',
        password: '',

      }
    } else {
      return {
        name: "",
        email: "",
        password: "",
        rePassword: "",
        role: 'user'
      }
    }
  }
  const formik = useFormik({
    initialValues: initialValues(),
    onSubmit: values => {
      console.log('Form Values', values);
      if (formtype === 'login') {
        login(values);
      } else {
        signup(values)
      }
    }
  });


  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-cyan-50 to-blue-100 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-sky-300/30 rounded-full blur-3xl animate-pulse -z-10"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-300/30 rounded-full blur-3xl animate-pulse  -z-10" style={{ animationDelay: '1000ms' }}></div>

      <div className="w-full max-w-md bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/50 relative z-10 transition-all duration-300">
        <div className="text-center mb-8">
          <span className="text-2xl mb-2 block">👋</span>
          <h2 className="text-3xl font-black bg-gradient-to-r from-sky-600 via-cyan-600 to-blue-600 bg-clip-text text-transparent">
            {formtype === 'login' ? 'Welcome Back' : 'Create Account'}
          </h2>
          <p className="text-slate-500 mt-2 font-medium">
            {formtype === 'login' ? 'Enter your details to access your account' : 'Join us to book appointments easily'}
          </p>
        </div>

        <form className="w-full space-y-2" onSubmit={formik.handleSubmit}>
          {fields.map(field => (
            <InputField key={field.id} {...field} formik={formik} />
          ))}

          <div className="pt-4">
            <button
              type="submit"
              className="btn w-full bg-gradient-to-r from-sky-600 to-cyan-600 hover:from-sky-700 hover:to-cyan-700 text-white border-none rounded-xl shadow-lg hover:shadow-sky-200 hover:scale-[1.02] transition-all duration-300 normal-case text-lg font-bold h-12"
            >
              {formtype === 'login' ? 'Login' : 'Sign Up'}
            </button>
          </div>
        </form>

        <div className="divider my-6 text-slate-400 font-medium text-sm">Or</div>

        <div className="text-center">
          <p className="text-slate-600 mb-3 font-medium">
            {formtype === 'login' ? "Don't have an account?" : "Already have an account?"}
          </p>
          <button
            onClick={() => navigate(formtype === 'login' ? '/form/signup' : '/form/login')}
            className="btn btn-ghost btn-outline w-full border-2 border-slate-200 hover:border-sky-300 text-slate-600 hover:text-sky-600 hover:bg-sky-50 rounded-xl transition-all duration-300 normal-case font-bold"
          >
            {formtype === 'login' ? 'Create Account' : 'Login'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default DynamicForm;
