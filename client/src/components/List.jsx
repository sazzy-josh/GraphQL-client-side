import React from 'react'
import { formatDistanceToNow } from 'date-fns'
import { AUTH_TOKEN } from '../constants';
import { gql, useMutation } from '@apollo/client';


const UPVOTE = gql`
  mutation upvote($linkId : ID!){
    vote(linkId: $linkId) {
      id 
      link{
        id
        votes{
          id
          user{
            id
            name
            email
          }
        }
      }
      user{
      id  
      }
    }
  }
`


const List = ({data}) => {
  const authToken = localStorage.getItem(AUTH_TOKEN);

  const [vote] = useMutation(UPVOTE , {
    variables : {
      linkId : data?.id
    }
  })
  
  return (
    <div>
     <a className='text-blue-300 underline' href={data?.url}>{data?.url}</a>
     <p>{data?.description}</p>
     {authToken && (
        <div className='flex gap-x-1'>
          <div
            className="cursor-pointer"
            onClick={() => { vote()}}
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