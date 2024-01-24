import axios from "axios";
import {baseUrl} from "../App";
import toast from "react-hot-toast";


export const LogoutAction  = ()=> {
  return {
    type: 'LOGOUT'
  }
}

export const loginAction = (usersData, navigate) => async (dispatch) => {
  try {

    dispatch({
        type:"LOGIN_REQUEST",
    })
    console.log(baseUrl,"hello")

    const response = await axios.post(
        `https://med.test.avika.ai/auth/login`,
        usersData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response,baseUrl,"hello")
      sessionStorage.setItem('token',response.data.data.token )
      dispatch({
        type:"LOGIN_SUCCESS",
        payload: response.data
      })  
      alert(`Hi! ${response?.data?.data?.user[0]?.username}`)
      // toast(`Hi! ${response?.data?.data?.user[0]?.username}`);
      navigate(`/dashboard`)
  } catch (error) {
    // toast.error(error?.response?.data?.message);
    alert(error?.response?.data?.message)
    dispatch({
        type:"LOGIN_FAILED",
        payload:error?.response?.data
    })
  }
};
