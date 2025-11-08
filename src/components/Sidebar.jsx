import React from 'react';
import { Home, Ticket, Users, Package, Settings, ChevronLeft, ChevronRight } from 'lucide-react';

const navItems = [
  { key: 'dashboard', label: 'Dashboard', icon: Home },
  { key: 'tickets', label: 'Tickets', icon: Ticket },
  { key: 'management', label: 'Management', icon: Users },
  { key: 'products', label: 'Products', icon: Package },
  { key: 'settings', label: 'Settings', icon: Settings },
];

export default function Sidebar({ collapsed, current, onNavigate, onToggle }) {
  return (
    <aside
      className={`h-screen bg-white border-r border-gray-200 flex flex-col transition-all duration-300 ${
        collapsed ? 'w-16' : 'w-64'
      }`}
    >
      <div className="flex items-center justify-between px-3 h-14 border-b">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-md bg-indigo-600 text-white flex items-center justify-center font-semibold">TS</div>
          {!collapsed && <span className="font-semibold">TicketSuite</span>}
        </div>
        <button
          onClick={onToggle}
          className="p-2 rounded hover:bg-gray-100 text-gray-600"
          aria-label="Toggle sidebar"
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      </div>

      <nav className="flex-1 py-3">
        {navItems.map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            onClick={() => onNavigate(key)}
            className={`w-full flex items-center gap-3 px-3 py-2.5 text-sm hover:bg-gray-100 transition-colors ${
              current === key ? 'bg-indigo-50 text-indigo-600' : 'text-gray-700'
            }`}
          >
            <Icon size={18} />
            {!collapsed && <span>{label}</span>}
          </button>
        ))}
      </nav>

      <div className="p-3 border-t">
        {!collapsed && (
          <div className="text-xs text-gray-500">v1.0 • © Your Company</div>
        )}
      </div>
    </aside>
  );
}
