import React, { useState , useEffect }  from 'react'
import { gql, useMutation } from '@apollo/client';
import { AUTH_TOKEN } from '../constants';
import { useNavigate } from 'react-router-dom';


const SIGN_UP = gql`
  mutation signUpNewUser($email: String!, $password :String!, $name:String! ) {
     signup(email:$email, password:$password, name:$name){
      token
     }
  }
`

const LOGIN = gql`
  mutation LoginUser($email: String!, $password : String!) {
     login(email: $email, password: $password){
      token
     }
  }
`

const Login = () => {

const navigate = useNavigate()

  const [formDetails, setformDetails] = useState({
    name: "",
    email : "",
    password : ""
  });

  const [loginState , handleFormState] = useState(true)
  const [showError , setShowError] = useState({
    isError : false,
    ErrorMessage : ""
  })

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowError((prev) => {
        console.log("useEffect ran")
        return {
         ...prev, 
         isError : false
        }
       })  
    },4000);
    return () => clearTimeout(timer)
  }, [showError.isError])

 const handleInputChange = (e) => {
    const { name , value } = e.target
    setformDetails({...formDetails , [name]: value})
  } 
 
  // MUTATION FUNCTION TO LOGIN AN EXISTING USER
  const [ login ] = useMutation(LOGIN , {
    variables : {
      email : formDetails.email,
      password : formDetails.password
    } ,
    onCompleted : ({login}) => {
      setShowError((prev) => {
       return {
        ...prev, 
        isError : false
       }
      });
      localStorage.setItem(AUTH_TOKEN , login.token);
      navigate("/")
    },
    onError : (error) => {
      setShowError((prev) => {
        return {
         isError : true ,
         ErrorMessage : error.message
        }
      })
    }
  })


  //MUTATION FUNCTION TO SIGNUP A NEW USER

const [ signup ] = useMutation(SIGN_UP , {
    variables : {
      name : formDetails.name,
      email : formDetails.email,
      password : formDetails.password
    } ,
    onCompleted : ({signup}) => {    
      handleFormState(prev => !prev);
      setShowError((prev) => {
        return {
         ...prev, 
         isError : false
        }
       }); 
   
       // console.log("Signed up succesfully" , signup.token)
    },
    onError : (error) => {
      setShowError((prev) => {
        return {
         isError : true ,
         ErrorMessage : error.message
        }
      })
    }
  })
 

  const handleSignUp = (e) => {
     e.preventDefault()
     signup()
  }

  const handleLogin = (e) => {
    e.preventDefault()
    login()
 }

  return (
    <div className='w-screen flex flex-col items-center gap-y-4'>
     <h3 className='font-bold text-gray-600 text-2xl'>{loginState ? "LOGIN" : "SIGN UP"}</h3>
     
    <p className={`absolute right-2 top-0.5 lg:w-1/4 p-2 text-xl border rounded-md bg-red-300 text-slate-50 text-center ${showError.isError ? "translate-y-0" : "-translate-y-[50vh]"}`}>{showError.ErrorMessage}</p>
      
      
      <form className='flex flex-col gap-y-2 lg:w-1/4' onSubmit={loginState ? handleLogin : handleSignUp }>
        { !loginState ? <input type="text" name='name' placeholder='Enter your name' className='border-2 rounded-md px-2 py-1 border-slate-200 focus:border-slate-200 !focus:outline-none  active:outline-none' value={formDetails.name} onChange={handleInputChange}/> : null}

        <input type="text" name='email' placeholder='Enter your email' className='border-2 rounded-md px-2 py-1 border-slate-200 focus:border-slate-200' value={formDetails.email} onChange={handleInputChange} autoComplete='off' />

        <input type="password" name='password' placeholder='password' className='border-2 rounded-md px-2 py-1 border-slate-200 focus:border-slate-200' value={formDetails.password} onChange={handleInputChange} autoComplete='off' />

        <input type="submit" value={loginState  ? 'LOGIN' : "SIGN UP" } className="border rounded-md p-2 cursor-pointer bg-blue-300 text-white" />
      </form>

      <p>{loginState ? "Don't" : "Already"} have an account? <span className='text-blue-500 underline cursor-pointer' onClick={ () => handleFormState(prev => !prev) }>{loginState ? "Sign up" : "Log in"}</span>
      </p>

    </div>
  )
}

export default Login