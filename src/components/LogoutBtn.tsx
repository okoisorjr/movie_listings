import classNames from 'classnames'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const LogoutBtn = () => {
    const navigate = useNavigate();

    const logout = async () => {
      localStorage.clear();
      navigate("/");
    }   

    return (
      <React.Fragment>
          <button onClick={logout} className={classNames('')}>
              <i className='ri-logout-box-r-line text-2xl cursor-pointer'></i>
          </button>
      </React.Fragment>
    )
}

export default LogoutBtn
