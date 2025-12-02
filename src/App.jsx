import { Link, Outlet } from 'react-router-dom'

function App() {
  

  return (
   <>
     

      <main>
        <Outlet />
      </main>
       {/* <nav style={{padding:16, borderBottom:'1px solid #ddd'}}>
        <Link to="/" style={{marginRight:12}}>Home</Link>
        <Link to="/about">About</Link>
        <Link to="/users/42" style={{marginLeft:12}}>User 42 (example)</Link>
      </nav> */}
    </>
  )
}

export default App
