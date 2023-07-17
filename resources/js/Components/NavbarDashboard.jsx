import React from 'react';
import { Link } from '@inertiajs/react';
import { FaAlignLeft } from 'react-icons/fa6';
import { VscSignOut } from 'react-icons/vsc';

function NavbarDashboard({ sidebarHandler }) {
  return (
    <header className="bg-white p-2 top-0 sticky shadow shadow-slate-400 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div>
          <button
            type="button"
            onClick={sidebarHandler}
            className="inline-flex items-center p-2 mt-2  border border-orange-600 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
          >
            <FaAlignLeft className="w-7 h-7" />
          </button>
        </div>
        <div>
          <a href="/">
            <img
              src="/assets/images/logo.png"
              alt="logo"
              className="h-14 mx-auto"
            />
          </a>
        </div>
        <div>
          <Link
            as="button"
            href="/logout"
            method="POST"
            className="inline-flex bg-slate-400 items-center p-2 mt-2 text-sm text-gray-50 rounded-lg hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-gray-200"
          >
            <span className="sr-only">Logout</span>
            <VscSignOut className="w-7 h-7" />
          </Link>
        </div>
      </div>
    </header>
  );
}

export default NavbarDashboard;
