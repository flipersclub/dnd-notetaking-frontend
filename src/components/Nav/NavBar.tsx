import React, { JSX } from 'react'
import { useAuth } from '../../providers/AuthProvider'
import { Link } from 'react-router-dom'
import LoginIcon from '../Icons/LoginIcon'
import HamburgerIcon from '../Icons/HamburgerIcon'

interface NavBarParams {
  setSideBarOpen: (open: boolean) => any;
}

const NavBar = ({ setSideBarOpen }: NavBarParams): JSX.Element => {

  const { token } = useAuth()

  console.log(token)
  return (
    <div>
      <div className="flex justify-between px-8 py-5 items-center">
        <div className="flex space-x-3 items-center">
          <div
            className="w-15 h-15 shadow-lg backdrop-blur-md rounded-full bg-gray-800 bg-opacity-50 py-4 px-4 items-cente cursor-pointer"
            onClick={() => setSideBarOpen(true)}>
            <Link to={'/'}/>
            <HamburgerIcon/>
          </div>
          <h1 className="font-display text-white uppercase tracking-widest cursor-pointer">Logo Here</h1>
        </div>
        {!token ? (
          <Link
            className="w-15 h-15 shadow-lg backdrop-blur-md rounded-full bg-gray-800 bg-opacity-50 py-4 px-4 items-cente cursor-pointer text-white"
            to={'/login'}>
            <LoginIcon size={5}/>
          </Link>
        ) : (
          <Link
            className="w-15 h-15 shadow-lg backdrop-blur-md rounded-full bg-gray-800 bg-opacity-50 py-4 px-4 items-cente cursor-pointer text-white"
            to={'/logout'}>
            <LoginIcon size={5}/>
          </Link>
        )}
      </div>
    </div>
  )
}

export default NavBar