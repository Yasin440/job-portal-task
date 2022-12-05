import axios from "axios";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import jwtDecode from "jwt-decode";

const useAuthAction = () => {
  const [loading, setLoading] = useState(false);
  const [logout, setLogout] = useState(false);
  const [user, SetUser] = useState(false);

  const baseUrl = 'http://localhost:5000'
  const decodeToken = token => {
    const decodedToken = jwtDecode(token);
    const exp = new Date(decodedToken.exp * 1000);
    if (new Date() < exp) {
      return decodedToken
    } else if (new Date() > exp) {
      toast.error("Auth expired login again.");
      return null;
    }
  }

  //find user if already log in
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      const user = decodeToken(token);
      const { name, email } = user;
      SetUser({ name, email })
    } else if (!token) {
      SetUser(false);
    }
  }, [loading, logout])
  //user registration
  const registerUser = async (signUpData) => {
    setLoading(true);
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    try {
      const res = await axios.post(`${baseUrl}/register-user`, signUpData, config);
      if (res) {
        toast.success(`${res.data.success.message}`);
        localStorage.setItem('authToken', res.data.success.token);
        setLoading(false);
      }
    } catch (error) {
      toast.error(`${error?.response?.data?.error?.message}`);
      setLoading(false)
    }
  }
  //login user
  const loginUser = async (data) => {
    setLoading(true);
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    try {
      const res = await axios.post(`${baseUrl}/login-user`, data, config);
      if (res) {
        toast.success(`${res.data.success.message}`);
        localStorage.setItem('authToken', res.data.success.token);
        setLoading(false);
      }
    } catch (error) {
      toast.error(`${error.response.data.error.message}`);
      setLoading(false)
    }

  }
  //add new post 
  const addNewJob = async (jobData) => {
    setLoading(true);
    const token = localStorage.getItem('authToken');
    const config = {
      headers: {
        'Content-Type': 'application/json',
        authtoken: token
      }
    }
    try {
      const res = await axios.post(`${baseUrl}/add-new-job`, jobData, config);
      if (res) {
        console.log('add-new-job', res);
        toast.success(`${res.data.success.message}`);
        setLoading(false)
      }
    } catch (error) {
      console.log('add-new-job', error);
      toast.error(`${error.response.data.error.message}`);
      setLoading(false)
    }
  }
  return {
    registerUser,
    loginUser,
    addNewJob,
    loading,
    setLoading,
    setLogout,
    user
  };
}
export default useAuthAction;