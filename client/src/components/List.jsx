import React from 'react'
import { formatDistanceToNow } from 'date-fns'
import { AUTH_TOKEN } from '../constants';



const List = ({data}) => {
  const authToken = localStorage.getItem(AUTH_TOKEN);
  // console.log(new Date(data?.createdAt).toLocaleString())
  
  return (
    <div>
     <a className='text-blue-300 underline' href={data?.url}>{data?.url}</a>
     <p>{data?.description}</p>
     <p>
      Posted {`${formatDistanceToNow(
      new Date(data?.createdAt)
     )} ` +"ago"}
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