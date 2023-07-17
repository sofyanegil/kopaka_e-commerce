import React from 'react';
import { Link, usePage } from '@inertiajs/react';
import hasAnyPermission from '../Utils/Permissions';

export default function SideBarItem({
  href, permission, icon, name,
}) {
  const { url } = usePage();
  const isActive = url.startsWith(href);

  return (
    hasAnyPermission([permission]) && (
    <Link
      href={href}
      className={`flex items-center mb-30 p-1.5 rounded-sm ${
        isActive
          ? 'text-white bg-orange-600 hover:bg-orange-700'
          : 'text-gray-900 bg-slate-100 hover:bg-slate-200'
      }`}
    >
      <span className="flex items-center justify-center w-10 h-10 mr-2 text-xl text-center text-whiterounded-lg">
        {icon}
      </span>
      <span className="ml-3 flex flex-auto text-lg">{name}</span>
    </Link>
    )
  );
}
