import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthContext';
import { CreateUserDatabaseContext } from '../../../context/UserDbContext';
import { toast } from 'react-toastify';

export function useLogin() {
  const { login } = useContext(AuthContext);
  const { getData } = useContext(CreateUserDatabaseContext);
  const navigate = useNavigate();

  const handleLogin = async (values) => {
    try {
      const loginInfo = await login(values);
      if (loginInfo) {
        console.log(loginInfo)

        if (loginInfo) {
          const userData = await getData(loginInfo.user.uid)
          localStorage.setItem("role", userData.role)
          localStorage.setItem("user_id", loginInfo.user.uid)
        }
        toast.success("Login successful!");
        navigate("/");
      }
    } catch (err) {
      toast.error("Something went wrong");
      console.log(err, "login error");
    }
  };
  return handleLogin;
}