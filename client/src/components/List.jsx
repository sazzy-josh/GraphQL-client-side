import React from 'react'

const List = ({data}) => {
  
  return (
    <div>
     <a className='text-blue-300 underline' href={data?.url}>{data?.url}</a>
     <p>{data?.description}</p>
     <p>
      Posted at - {new Date(data?.createdAt).toLocaleString()} 
     </p>

    </div>
  )
}

export default List