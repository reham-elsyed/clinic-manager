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


const InputField = ({ id, name, type, placeholder, formik }) => {
  const isError = formik.touched[name] && formik.errors[name];

  return (
    <div className="form-control w-full mb-4 group">
      <label htmlFor={id} className="label pb-1">
        <span className="label-text text-slate-600 font-semibold group-focus-within:text-sky-600 transition-colors">
          {name.charAt(0).toUpperCase() + name.slice(1)}
        </span>
      </label>
      <div className="relative">
        <input
          id={id}
          name={name}
          type={type}
          placeholder={placeholder}
          className={`
            w-full px-4 py-3 rounded-xl border-2 outline-none transition-all duration-300
            ${isError
              ? 'border-red-400 focus:border-red-500 bg-red-50 placeholder-red-300'
              : 'border-slate-200 focus:border-sky-500 bg-white/50 focus:bg-white hover:border-sky-200'
            }
            focus:shadow-lg focus:shadow-sky-100
            text-slate-700 placeholder-slate-400 font-medium
          `}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values[name]}
          aria-invalid={isError ? "true" : "false"}
          aria-describedby={isError ? `${id}-error` : undefined}
        />
      </div>
      {isError && (
        <label className="label pt-1" id={`${id}-error`}>
          <span className="label-text-alt text-red-500 font-medium">{formik.errors[name]}</span>
        </label>
      )}
    </div>
  );
};
export default InputField