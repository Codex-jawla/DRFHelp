import React from 'react'
import { Link } from 'react-router'

const Home = () => {
  return (
    <div className='max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg text-blue-400'>
        <Link to="/form">Click to fill form</Link>
        <br/>
        <Link to='/adminpaneldashbord'>panel</Link>
    </div>
    
  )
}

export default Home