import React, { createContext, useState, useContext, ReactNode } from "react";
import axios from "axios";

interface formdata {
  username: string;
  name: string;
  email: string;
  phone: string;
  iplTeam: string;
  password: string;
}

interface ResponseData {
  token?: string;
  message?: string;
}

interface AuthContextType {
  formData: formdata;
  usernameError: string;
  emailError: string;
  phoneError: string;
  loading: boolean;
  error: string | null;
  responsedata: ResponseData | null;
  isAuthenticated:boolean;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  Signup: () => void;
  Signin: () => void;
  logout:() => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [formData, setFromdata] = useState<formdata>({
    username: '',
    name: '',
    email: '',
    phone: '',
    iplTeam: '',
    password: ''
  });

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [responsedata, setResponseData] = useState<ResponseData | null>(null);
  
  const [usernameError, setUsernameError] = useState<string>('');
  const [emailError, setEmailError] = useState<string>('');
  const [phoneError, setPhoneError] = useState<string>('');
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!localStorage.getItem("token"));

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    if (name === 'username') {
      if (value.length < 3) {
        setUsernameError('Username must be at least 3 characters.');
      } else {
        setUsernameError('');
      }
    }

    if (name === 'email') {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(value)) {
        setEmailError('Please enter a valid email address.');
      } else {
        setEmailError('');
      }
    }

    if (name === 'phone') {
      if (value.length !== 10) {
        setPhoneError('Phone number must be exactly 10 digits.');
      } else {
        setPhoneError('');
      }
    }

    setFromdata({
      ...formData,
      [name]: value
    });
  };

  const Signup = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post("http://localhost:3000/api/v1/signup", formData);
      setResponseData(response.data);
      localStorage.setItem('token',response.data.token)
      const id = response.data.id
      localStorage.setItem('id',id)
      setIsAuthenticated(true)
      setFromdata({
        username: '',
        name: '',
        email: '',
        phone: '',
        iplTeam: '',
        password: ''
      });
    } catch (error: any) {
      console.log("Something went wrong " + error.message);
      setError(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  const Signin = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post("http://localhost:3000/api/v1/signin", formData);
      setResponseData(response.data);
      const token = response.data.token
      localStorage.setItem('token',token)
      const id = response.data.id
      localStorage.setItem('id',id)

      setIsAuthenticated(true)
      setFromdata({
        username: '',
        name: '',
        email: '',
        phone: '',
        iplTeam: '',
        password: ''
      });
    } catch (error: any) {
      console.log("Something went wrong " + error.message);
      setError(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };
  const logout = ()=>{
    localStorage.removeItem('token')
    localStorage.removeItem('id')
    setIsAuthenticated(false)
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        formData,
        usernameError,
        emailError,
        phoneError,
        loading,
        error,
        responsedata,
        handleChange,
        Signup,
        Signin,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
