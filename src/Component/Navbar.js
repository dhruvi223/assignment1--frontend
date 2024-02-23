import React from 'react'
import { Outlet} from 'react-router-dom'
import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <header className='bg-slate-200 shadow-md'>
      <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>

      <Link to={'/'}>
              <h1 className='font-bold text-sm sm:text-xl flex flex-wrap'>
                <span className='text-slate-500'>Ecommerce</span>
                <span className='text-slate-700'>Platform</span>
              </h1>
      </Link>

      <form className='bg-slate-100 p-3 rounded-lg flex items-center'>
        <input className='bg-transparent focus:outline-none w-24 sm:w-64' type='text' placeholser='search here...'/>
        <button></button>  
      </form>

      <ul className='flex gap-4'>
        <Link to={'/'}>
        <li className='text-slate-700 hover:underline'>
          Home
        </li>
        </Link>
        <Link to={'/login'}>
        <li className='text-slate-700 hover:underline'>
          Sign in
        </li>
        </Link>
        <Link to={'/profile'}>
        <li className='text-slate-700 hover:underline'>
          Profile
        </li>
        </Link>
        <Link to={'/show-list'}>
        <li className='text-slate-700 hover:underline'>
          List
        </li>
        </Link>
      </ul>


      {/* <nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid">
    <a className="navbar-brand" to="#">Navbar</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
      <div className="navbar-nav"> */}
        {/* <a className="nav-link active" aria-current="page" to="/">Home</a> */}
        {/* <a className="nav-link active" aria-current="page" to="/">Home</a>
        <a className="nav-link" href="#">Features</a>
        <a className="nav-link" href="#">Pricing</a>
        <a className="nav-link disabled" aria-disabled="true">Disabled</a>
      </div>
    </div>
  </div>
</nav> */}






</div>
    </header>
  )
}

export default Navbar
