import { Outlet } from 'react-router-dom';
import SideBar from './SideBar';

const Layout = () => {
  return (
    <main className='flex h-screen overflow-y-auto'>
      <SideBar />
      <article className='flex-1 flex flex-col items-center justify-center py-12'>
        <Outlet />
      </article>
    </main>
  );
};

export default Layout;
