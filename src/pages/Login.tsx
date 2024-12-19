import React, { ChangeEvent, useState } from 'react'
import PrimaryBtn from '../components/PrimaryBtn';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { base_url } from '../utils/baseUrl';
import Footer from '../components/Footer';

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const navigateToDashboard = () => {
    navigate("/movies");
  }

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
      setEmail(e.target.value);
    };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
      setPassword(e.target.value);
    };

  const handleSubmit = async () => {
      setError("");
      const data = {
        email: email,
        password: password
      };

      try {
        const response = await axios.post(`${base_url}/sign_in`, data);
        console.log(response.data);
        if (response.status == 200) {
          localStorage.setItem('loggedIn', JSON.stringify(true));
          localStorage.setItem('access_token', JSON.stringify(response.data.access_token));
          navigateToDashboard();
        }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        setError(error.response.data.errorMsg);
      }
    };
  
  
  return (
    <React.Fragment>
      <div className='bg-backgroundColor text-white overflow-hidden min-h-screen'>
        <div className='max-w-xs mx-auto translate-y-1/2 rounded-xl'>
          <div className='my-5'>
            <p className='text-3xl text-center font-semibold'>Sign In</p>
            <div className='flex my-5 flex-col gap-5'>
              <input 
                type='text' 
                placeholder='Email' 
                className='w-full bg-inputColor focus:outline-none p-3 rounded-md' 
                value={email}
                onChange={handleEmailChange}
              />
            
              <input 
                type='password' 
                placeholder='Password' 
                className='w-full bg-inputColor focus:outline-none p-3 rounded-md' 
                value={password} 
                onChange={handlePasswordChange}
              />
            </div>
            <div className='my-5 self-start'>
              <div className='flex gap-3 justify-center items-center text-gray-400'>
                <input type='checkbox' />
                Remember me
              </div>
            </div>
            <div className='w-full my-2'>
              <PrimaryBtn onClick={() => {handleSubmit()}}>Login</PrimaryBtn>
            </div>
            {error && <div>
              <p className='text-center text-red-600 my-5 font-semibold text-sm'>{error}</p>  
            </div>}
          </div>
        </div>
      </div>
      <Footer/>
    </React.Fragment>
  )
}

export default Login