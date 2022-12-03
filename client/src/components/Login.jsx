import React, { useState }  from 'react'
import { gql, useMutation } from '@apollo/client';
import { AUTH_TOKEN } from '../constants';
import { useNavigate } from 'react-router-dom';


const SIGN_UP = gql`
  mutation signUpNewUser($email: String! , $password :String! , $name:String! ) {
     signup(email:$email, password:$password, name:$name){
      token
     }
  }
`

const LOGIN = gql`
  mutation LoginUser($email: String! , $password : String!) {
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
      localStorage.setItem(AUTH_TOKEN , login.token)
       navigate("/")
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
        console.log("Signed up succesfully" , signup.token)
    },
    onError : (error) => {
       alert(error.message)
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