import React , { useState }from 'react'
import { gql , useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';


const POST_NEW_LINK = gql`
 mutation postNewLink($url : String! , $description: String!){
    post(url: $url , description : $description){
      id
      postedBy{
        id
      }
    }
  }
`

const NewLink = () => {
 const navigate = useNavigate()

  const [formDetails, setformDetails] = useState({
    desc: "",
    url : "",
  });

  const handleInputChange = (e) => {
    const { name , value } = e.target
    setformDetails({...formDetails , [name]: value})
  } 

  const [ addNewLink ] = useMutation(POST_NEW_LINK , {
    variables: {
      url : formDetails.url,
      description : formDetails.desc
    },
    onCompleted : () => {
      navigate('/')
    }
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    addNewLink()
  }

  return (
    <div className='w-screen flex flex-col items-center gap-y-4'>
     <h3 className='font-bold text-gray-600 text-2xl'></h3>
  
      <form className='flex flex-col gap-y-2 lg:w-1/4' onSubmit={handleSubmit}>

         <input type="text" name='url' placeholder='Enter your url' className='border-2 rounded-md px-2 py-1 border-slate-200 focus:border-slate-200' value={formDetails.url} onChange={handleInputChange} autoComplete='off'/>
       
         <textarea name="desc" cols="30" className='border-2 rounded-md px-2 py-1 border-slate-200 focus:border-slate-200' value={formDetails.desc} onChange={handleInputChange}></textarea>

         <input type="submit" value="Submit" className="border rounded-md p-2 cursor-pointer bg-blue-300 text-white"/>
      </form>
    </div>
  )
}

export default NewLink