import React from 'react'

const List = ({data}) => {
  return (
    <div>
        <div>
         {data.description} - ({data.url})
        </div>
    </div>
  )
}

export default List