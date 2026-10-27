import Navbar from './components/Navbar'
import Farmer from './components/Farmer'
import FarmProduct from './components/FarmProduct'
import Footer from './components/Footer'
import {Outlet} from 'react-router'
function App() {


  return (
    <>
      {/* <p>Enrollment Number : 202604104610024</p>
      <h1>Farm Management Dashboard</h1> */}
      <Navbar />

     
     <Outlet />

     <Footer/>
     
    </>
  )
}

export default App
