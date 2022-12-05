import { gql , useQuery } from '@apollo/client'
import List from './List'


// ======================================
// GET ALL LINK QUERY SCHEMA
// ======================================
export const GET_ALL_LINK = gql`
  query getFeeds {
    feed {
      id
      links {
        id
        createdAt
        url
        description
        postedBy {
          id
          name
        }
        votes {
          id
          user {
            id
          }
        }
      }
    }
  }
`

const LinkList = () => {

    const { data , loading , error } = useQuery(GET_ALL_LINK)
    
    // ==================================================================================================
    // ALWAYS RETURN A LOADING STATE ELSE GRAPHQL QUERY WOULD RETURN AN ERROR BEFORE SERVER RETURNS DATA
    // ==================================================================================================
    if(loading){
        return <h3>Loading....</h3>
    }

    // THROWS AN ERROR IF THE SERVER ENCOUNTERED AN ERROR WHILE FETCHING DATA 
    if(error) {
        return <h3>Ooops😕! ! Something went wrong...</h3>
    }

  return (
    <>  
      <div>
        {data?.feed?.links.map((item) => {
            return (
                <List key={item.id} data={item} />
            )
         })
        }
        
      </div>
    </>
  )
}

export default LinkList