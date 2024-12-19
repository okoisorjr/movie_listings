import classNames from 'classnames'
import React from 'react'

const CancelBtn = ({children, onClick}: {children: React.ReactNode, onClick: () => void}) => {
  return (
    <React.Fragment>
      <button onClick={onClick} className={classNames('bg-[inherit] border border-white text-white px-5 py-3 rounded-md w-full')}>{children}</button>
    </React.Fragment>
  )
}

export default CancelBtn
