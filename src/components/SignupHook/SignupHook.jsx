import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthContext';
import { CreateUserDatabaseContext } from '../../../context/UserDbContext';
import { useContext } from 'react';

export default function useSignup() {
  const { signup, setCurrentUser, currentUser } = useContext(AuthContext);
  const { addData } = useContext(CreateUserDatabaseContext)
  let navigate = useNavigate()
  function generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  async function registration(values) {

    //  setIsLoading(true)
    try {
      const res = await signup(values)
      const id = generateUUID()
      const data = { ...values, user_id: id }
      await handleAdddata(data, res)
      console.log(res)
      localStorage.setItem("role", res.user.role)
      localStorage.setItem("user_id", res.user.uid)
      navigate("/")
      // setIsLoading(false)
    } catch (error) {
      console.log(error, "data error")
      // setUserError("Failed to create an account")
      // setIsLoading(false)
    }
  }

  const handleAdddata = async (values, res) => {
    await addData(values, res)
  }
  return registration
}