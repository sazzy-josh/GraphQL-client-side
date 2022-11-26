import { ApolloClient, InMemoryCache, ApolloProvider, HttpLink } from '@apollo/client';
import LinkList from "./components/LinkList"

const link = new HttpLink({
  // uri : process.env.REACT_APP_GRAPHQL_ENDPOINT
})

const cache = new InMemoryCache()

const client = new ApolloClient({
  link ,
  cache
})


function App() {
  console.log("env:" ,  import.meta.env.VITE_GRAPHQL_ENDPOINT)

  return (
    <ApolloProvider client={client}>
      <div className="flex items-center justify-center h-screen w-screen">
        <LinkList  />
      </div>
    </ApolloProvider>
  )
}

export default App
