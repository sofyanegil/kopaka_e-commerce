import React, { useEffect, useState } from 'react';
import NavbarDashboard from '../Components/NavbarDashboard';
import SideBar from '../Components/SideBar';

export default function LayoutAccount({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth > 768);

  useEffect(() => {
    const handleResize = () => {
      setIsSidebarOpen(window.innerWidth > 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <NavbarDashboard sidebarHandler={toggleSidebar} />
      <main className="flex">
        <SideBar isSidebarOpen={isSidebarOpen} />
        <section
          className={`flex-1 p-8 max-sm:overflow-x-hidden transition-all duration-500 ease-in-out ${
            isSidebarOpen ? 'ml-64' : 'ml-0'
          }`}
        >
          {children}
        </section>
      </main>
    </>
  );
}
