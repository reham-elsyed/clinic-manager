export const formConfigurations = {
    login: [
      { id: 'email', name: 'email', type: 'email', placeholder: 'Type your email' },
      { id: 'password', name: 'password', type: 'password', placeholder: 'Type your password' }
    ],
    signup: [
      { id: 'name', name: 'name', type: 'text', placeholder: 'Type your name' },
      { id: 'email', name: 'email', type: 'email', placeholder: 'Type your email' },
      { id: 'password', name: 'password', type: 'password', placeholder: 'Create a password' },
      { id: 'repassword', name: 'repassword', type: 'password', placeholder: 'Enter a password again' }

    ]
  };
  

const InputField = ({id, name, type,placeholder,formik}) =>(
    <div className="form-control">
  <label htmlFor={id} className="label ">
   {name}
  </label>
  <input
    id={id}
    name={name}
    type={type}
    placeholder={placeholder}
    className="input input-bordered input-secondary  focus:outline-none w-full "
 onChange={formik.handleChange}
 onBlur={formik.handleBlur}
 value={formik.values[name]}
 />
</div>
)
export default InputField