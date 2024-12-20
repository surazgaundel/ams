import {useState} from 'react'
import {useNavigate} from 'react-router-dom';

import { useAuth } from '../../auth/authContext';

import { handleSuccess, handleError } from '../../utils/helper';

import { signup } from '../../api/apiLayer';
import LogoImage from '../../assets/Frame.png';

export default function LogIn() {
  const [userDetails,setUserDetails]=useState({
    fullName:'',
    email:'',
    password:''
  })
  const [isUser, setIsUser] = useState(true);

  const {user,handleLogin} = useAuth();
  const navigate = useNavigate();

  const handleInputChanges=(e)=>{
    setUserDetails(prev=>({...prev,[e.target.name]:e.target.value}))
  }


  //handle login submit
  const handleLogInSubmit=async(e)=>{
    e.preventDefault();
    const {email,password} = userDetails;
    await handleLogin(email,password);
    if(user){
      navigate('/');
      handleSuccess(user.data.message);
    }
    setUserDetails({email:'',password:''})
  }

  //handle signup submit
  const handleSignUpSubmit=async(e)=>{
    e.preventDefault();
    if(isUser) return null;
    const {fullName, email, password} = userDetails;
    await signup({fullName, email, password});
    setUserDetails({fullName:'', email:'', password:''})
    handleSuccess('Successfully signed up');
    setIsUser(true);
  }


  return (
    <div className='border border-black h-[100vh] flex flex-col items-center md:flex-row justify-between w-full'>
      <div className='bg-violet-300 w-full h-1/3 md:h-screen md:w-1/2 flex flex-col justify-center items-center'>
      <img src={LogoImage} alt="logo" className=" w-32 md:w-48 m-5" />
      <span className='capitalize font-extrabold text-center text-xl md:text-4xl tracking-wide leading-9'>
        Artist Management System
      </span>
      </div>
      <div className="bg-yellow-300 w-full h-2/3 md:h-screen md:w-1/2 flex flex-col justify-center items-center">
      {isUser?
        (<div className='w-[60%] lg:w-[50%] mx-auto bg-violet-300 shadow-xl rounded-xl p-10 py-5 flex flex-col items-center'>
          <h1 className="text-2xl font-bold m-1">Log In</h1>
          <form onSubmit={handleLogInSubmit} className="flex flex-col gap-2 justify-center w-[90%]">
          <label htmlFor="email">Email address</label>
          <input 
            type="email" 
            name="email" 
            className='rounded-md p-2'
            placeholder="abc@email.com" 
            required
            value={userDetails.email}
            onChange={handleInputChanges}
          />
          <label htmlFor="password">Password</label>
          <input 
            type="password" 
            name="password" 
            className='rounded-md p-2'
            placeholder="*******" 
            required
            value={userDetails.password}
            onChange={handleInputChanges}
          />
          <span className="text-center">New User ?
            <button className='underline px-2' onClick={()=>setIsUser(false)}>Create an Account</button>
          </span>
            <button type='submit' className="mt-5 bg-violet-700 text-yellow-300 px-4 py-2 rounded-md hover:text-white">Log In</button>
          </form>
        </div>):
        (
          <div className='w-[60%] lg:w-[50%] mx-auto bg-violet-300 shadow-xl rounded-xl px-10 py-5 flex flex-col items-center'>
            <h1 className="text-2xl font-bold m-1">Create an account</h1>
            <form action="POST" onSubmit={handleSignUpSubmit} className="flex flex-col gap-2 justify-center w-[90%]">
                <label htmlFor="text">Full Name</label>
                <input 
                type="text" 
                name="fullName" 
                placeholder="eg: Ram Sharma" 
                className='rounded-md p-2'
                required
                value={userDetails.fullName}
                min={3}
                onChange={handleInputChanges}
                />
                <label htmlFor="email">Email address</label>
                <input 
                type="email" 
                name="email" 
                placeholder="example@email.com" 
                required
                className='rounded-md p-2'
                value={userDetails.email}
                onChange={handleInputChanges}
                />
                <label htmlFor="password">Password</label>
                <input 
                type="password" 
                name="password" 
                placeholder="*******" 
                required
                className='rounded-md p-2'
                min={4}
                value={userDetails.password}
                onChange={handleInputChanges}
                />
                <span className="text-center">Already have an account ?
                  <button className='underline px-2' onClick={()=>setIsUser(true)}>Login</button>
                </span>
                <button type='submit' className="mt-5 bg-violet-700 text-yellow-300 px-4 py-2 rounded-md hover:text-white">Register</button>
            </form>
        </div>
        )
    }
      </div>
    </div>
  )
}
