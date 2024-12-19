import React from 'react'
import classNames from 'classnames'

const PrimaryBtn = ({children, onClick}: {children: React.ReactNode, onClick: () => void}) => {
  return (
    <React.Fragment>
        <button type='button' onClick={onClick} className={classNames('bg-primary text-white px-5 py-3 rounded-md w-full')}>{children}</button>
    </React.Fragment>
  )
}

export default PrimaryBtn