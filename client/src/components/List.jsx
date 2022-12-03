import React from 'react'
import { AUTH_TOKEN } from '../constants';



const List = ({data}) => {
  const authToken = localStorage.getItem(AUTH_TOKEN);
  
  return (
    <div>
     <a className='text-blue-300 underline' href={data?.url}>{data?.url}</a>
     <p>{data?.description}</p>
     <p>
      Posted at - {new Date(data?.createdAt).toLocaleString()} 
     </p>
     {authToken && (
        <div className='flex gap-x-1'>
          <div
            className="cursor-pointer"
            onClick={() => {console.log("Clicked vote button")}}
            >
            ▲ {" "} <span className='text-blue-500'>Upvote</span> 
          </div> 
         <div>
            | 5 votes | by{' '}
            { 'Unknown'}{' '}</div>  
        </div>
        )}
    </div>
  )
}

export default List