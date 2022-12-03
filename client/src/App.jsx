import { ApolloClient, InMemoryCache, ApolloProvider, HttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { Routes , Route } from "react-router-dom"
import { Layout, LinkList, Login, Navbar, NewLink } from './components';
import { AUTH_TOKEN } from './constants';

const authLink = setContext((_ , {headers}) => {
  const token = localStorage.getItem(AUTH_TOKEN)
  return {
   headers : {
     ...headers ,
     authorization : token ? `Bearer ${token}` : ""
   }
  }
})


const httpLink = new HttpLink({
  uri : import.meta.env.VITE_GRAPHQL_ENDPOINT
})

const cache = new InMemoryCache()

const client = new ApolloClient({
  link : authLink.concat(httpLink),
  cache
})



function App() {


  return (
    <ApolloProvider client={client}>
      <div className="h-screen w-screen overflow-x-hidden">
       <Navbar />
       <Routes>
        <Route path='/' element={<Layout />}>
         <Route index element={<LinkList />} />
         <Route path='list' element= {<LinkList />}/> 
         <Route path='newLink' element={<NewLink />} />
         <Route path='login' element={<Login />} />
        </Route>
       </Routes> 
      </div>
    </ApolloProvider>
  )
}

export default App
