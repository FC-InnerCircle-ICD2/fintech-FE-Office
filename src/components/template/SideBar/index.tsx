import { sideBarItems } from '@constants/sidebar.ts';
import SideBarItem from './SideBarItem.tsx';
import { useLocation } from 'react-router-dom';
import { useAuthStore } from '@store/authStore';
import IconComponnt from '../IconComponnt.tsx';
const SideBar = () => {
  const { pathname } = useLocation();
  const { auth, logout } = useAuthStore();

  return (
    <aside className='w-60 h-screen bg-[#f1f1f1] p-12'>
      <figure className='flex flex-col items-center gap-2'>
        <img src='/logo.png' className='w-8' />
        <h4 className='font-bold text-xl truncate'>{auth?.name}</h4>
      </figure>

      <nav className='flex flex-col h-[calc(100%-100px)]'>
        <ul>
          {sideBarItems.map((item) => (
            <SideBarItem
              key={item.name}
              name={item.name}
              icon={item.icon}
              link={item.link}
              isActive={pathname === item.link}
            />
          ))}
        </ul>
        <ul className='mt-auto px-4'>
          <li
            className='cursor-pointer text-center flex gap-2'
            onClick={() => logout()}
          >
            <IconComponnt icon='LogOut' />
            <p>로그아웃</p>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default SideBar;
