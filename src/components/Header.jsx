import React from 'react';
import { Menu, Bell, Search, User } from 'lucide-react';

export default function Header({ onHamburger, title }) {
  return (
    <header className="h-14 border-b bg-white flex items-center justify-between px-4">
      <div className="flex items-center gap-3">
        <button
          onClick={onHamburger}
          className="p-2 rounded-md hover:bg-gray-100 text-gray-700"
          aria-label="Toggle sidebar"
        >
          <Menu size={20} />
        </button>
        <h1 className="font-semibold text-gray-800">{title}</h1>
      </div>

      <div className="flex items-center gap-3">
        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-md bg-gray-100">
          <Search size={16} className="text-gray-500" />
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent outline-none text-sm w-48"
          />
        </div>
        <button className="p-2 rounded-md hover:bg-gray-100 text-gray-700" aria-label="Notifications">
          <Bell size={18} />
        </button>
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-indigo-600 text-white flex items-center justify-center">
            <User size={16} />
          </div>
          <span className="hidden sm:inline text-sm text-gray-700">Project Manager</span>
        </div>
      </div>
    </header>
  );
}
