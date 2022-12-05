import axios from "axios";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import jwtDecode from "jwt-decode";

const useAuthAction = () => {
  const [loading, setLoading] = useState(false);
  const [logout, setLogout] = useState(false);
  const [user, setUser] = useState(false);
  const [jobPost, setJodPost] = useState(false);
  console.log("jobPost", jobPost);

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
      setUser({ name, email })
    } else if (!token) {
      setUser(false);
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
  };

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

  };

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
        toast.success(`${res.data.success.message}`);
        setLoading(false)
      }
    } catch (error) {
      toast.error(`${error.response.data.error.message}`);
      setLoading(false)
    }
  };

  //get all posts
  const getAllJobPost = async () => {
    const token = localStorage.getItem('authToken');
    if (token) {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          authtoken: token
        }
      }
      try {
        const res = await axios.post(`${baseUrl}/get-all-post`, user, config);
        setJodPost(res.data.data);
      } catch (err) {
        toast.error(`${err.response.data.error.message}`);
      }
    } else {
      toast.error('Unauthorized');
    }
  }
  const deletePost = async (id) => {
    try {
      const res = await axios.delete(`${baseUrl}/delete-post/${id}`,);
      if (res) {
        console.log('delete-job', res);
        toast.success(`${res.data.success.message}`);

      }
    } catch (error) {
      console.log(error);
      toast.error(`${error.response.data.error.message}`);
    }
  }

  return {
    registerUser,
    loginUser,
    addNewJob,
    getAllJobPost,
    loading,
    setLoading,
    setLogout,
    deletePost,
    jobPost,
    user
  };
}
export default useAuthAction;