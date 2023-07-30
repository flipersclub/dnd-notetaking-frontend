import { JSX, useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { LucideProps } from 'lucide-react'
import SidebarItem from './SidebarItem'

export interface SidebarItemInterface {
  title: string;
  to?: string;
  icon?: (props: LucideProps) => JSX.Element,
  addNewLink?: string;
  hasChildren?: boolean;
  children?: SidebarItemInterface[];
}

interface TOwnProps {
  title: string;
  items: SidebarItemInterface[]
}

const Sidebar = ({ title, items }: TOwnProps): JSX.Element => {

  const [show, setShow] = useState<boolean>(false)

  useEffect(() => {
    setShow(true)
  }, [])

  return (
    <div className={`fixed z-10 top-14 left-0 pt-5 pl-5 h-screen`}>
      <div
        className={`absolute transition-all duration-1000 ${show ? 'top-5 opacity-100' : '-top-14 opacity-0'} scroll-auto`}>
        <div className="rounded-3xl bg-stone-900 border border-stone-700 w-80 py-6 px-8 text-stone-300">
          <h2 className="text-xl">{title}</h2>
          <ul className="mt-5">
            {items.map((item, index) => {
              return <SidebarItem item={item} key={index}/>
            })}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Sidebar