import React from 'react'

const Error = ({error}) => {
  return (
    <div className="container d-flex align-items-center justify-content-center" 
     style={{minHeight:"100vh"}}>
      <div className='text-center'>
        <h1 className='text-primary'>Oops : {error}</h1>
      </div>
    </div>
  )
}

export default Error