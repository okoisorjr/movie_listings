import React from 'react'
import footer from '/footer.png';

const Footer = () => {
  return (
    <React.Fragment>
      <div className='bottom-0'>
        <img src={footer} alt="" className='w-full'/>
      </div>
    </React.Fragment>
  )
}

export default Footer