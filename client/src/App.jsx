import { ApolloClient, InMemoryCache, ApolloProvider, HttpLink } from '@apollo/client';
import { Routes , Route } from "react-router-dom"
import { Layout, LinkList, Login, Navbar, NewLink } from './components';


const link = new HttpLink({
  uri : import.meta.env.VITE_GRAPHQL_ENDPOINT
})

const cache = new InMemoryCache()

const client = new ApolloClient({
  link ,
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
