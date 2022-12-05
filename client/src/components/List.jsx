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
     {authToken && (
        <div className='flex gap-x-1'>
          <div
            className="cursor-pointer"
            onClick={() => {console.log("Clicked vote button")}}
            >
            ▲ {" "} <span className='text-blue-500'>Upvote</span> 
          </div> 
         <div>
            | {data?.votes?.length} {data?.votes?.length <= 1  ? "vote" : "votes"} | by{' '}
            {data?.postedBy  ? data?.postedBy?.name  : 'Unknown' } {`${formatDistanceToNow(
      new Date(data?.createdAt)
     )} ` +"ago"}</div>  
        </div>
        )}
    </div>
  )
}

export default List