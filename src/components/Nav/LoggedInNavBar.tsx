import React, { JSX } from 'react'
import { Link, NavigateFunction, useNavigate } from 'react-router-dom'
import Menu from './Menu'
import { AlignLeft, LogOut, User2 } from 'lucide-react'
import { logout } from '../../services/AuthService'
import { unsetToken } from '../../reducers/auth/authSlice'
import { useAppDispatch } from '../../hooks'

interface NavBarParams {
  setSideBarOpen: (open: boolean) => any;
}

const LoggedInNavBar = ({ setSideBarOpen }: NavBarParams): JSX.Element => {

  const dispatch = useAppDispatch();
  const navigate: NavigateFunction = useNavigate()

  const handleLogout = (): void => {
    logout()
      .then(() => {
        dispatch(unsetToken(undefined));
        navigate('/', { replace: true })
      })
  }

  return (
    <div className="flex justify-between bg-stone-950 text-stone-300 px-5 py-2 items-center">
      <div
        className="cursor-pointer"
        onClick={() => setSideBarOpen(true)}>
        <AlignLeft size={25}/>
      </div>
      <Menu/>
      <div>
        <Link
          className="inline-block cursor-pointer"
          to={'/account'}>
          <User2 size={25}/>
        </Link>
        <button onClick={handleLogout} className="inline-block">
          <LogOut size={25}/>
        </button>
      </div>
    </div>
  )
}

export default LoggedInNavBar