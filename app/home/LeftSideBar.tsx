import { sidebarLinks } from '@/constants/index'
import Image from 'next/image';
import Link from 'next/link';

const LeftSideBar = () => {
  return (
    <section className="custom-sctrollbar leftsidebar text-white">
      <div className="flex w-full flex-1 flex-col gap-6 px-6 ">
        {sidebarLinks.map((link,index) => (
          <Link className='rounded font-semibold hover:bg-white hover:text-black p-1' href={link.route} key={index}>
            <p className='text-light-1 max-lg:hidden'> {link.label} </p> 
            </Link>
        ))}
      </div>
    </section>
  );
};

export default LeftSideBar;
