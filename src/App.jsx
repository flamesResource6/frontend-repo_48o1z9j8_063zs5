import React, { useMemo, useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import TicketForm from './components/TicketForm';
import TicketList from './components/TicketList';
import TicketDetail from './components/TicketDetail';

export default function App() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [current, setCurrent] = useState('tickets');
  const [tickets, setTickets] = useState([]);
  const [selected, setSelected] = useState(null);

  const title = useMemo(() => {
    switch (current) {
      case 'tickets':
        return 'Tickets';
      case 'products':
        return 'Products';
      case 'management':
        return 'Management';
      case 'settings':
        return 'Settings';
      default:
        return 'Dashboard';
    }
  }, [current]);

  const createTicket = (t) => {
    const withMessages = { ...t, messages: [] };
    setTickets((list) => [withMessages, ...list]);
    setSelected(withMessages);
  };

  const addMessage = (m) => {
    setTickets((list) =>
      list.map((t) => (t.id === m.ticketId ? { ...t, messages: [...(t.messages || []), m] } : t))
    );
    setSelected((t) => (t ? { ...t, messages: [...(t.messages || []), m] } : t));
  };

  return (
    <div className="h-screen w-screen overflow-hidden bg-gray-50 text-gray-900">
      <div className="flex h-full">
        <Sidebar
          collapsed={sidebarCollapsed}
          current={current}
          onNavigate={setCurrent}
          onToggle={() => setSidebarCollapsed((v) => !v)}
        />
        <div className="flex-1 flex flex-col min-w-0">
          <Header title={title} onHamburger={() => setSidebarCollapsed((v) => !v)} />

          <main className="flex-1 overflow-y-auto p-4">
            {current === 'tickets' && (
              <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
                <div className="xl:col-span-1">
                  <TicketForm onCreate={createTicket} />
                </div>
                <div className="xl:col-span-1">
                  <TicketList tickets={tickets} onSelect={setSelected} />
                </div>
                <div className="xl:col-span-1">
                  <TicketDetail ticket={selected} onAddMessage={addMessage} />
                </div>
              </div>
            )}

            {current === 'products' && (
              <div className="bg-white border rounded-lg p-6">
                <h2 className="font-semibold mb-2">Product Management</h2>
                <p className="text-sm text-gray-600">Manage your ERP, HCM, Crop Management and mobile apps. Add versions and modules, and link tickets for better traceability. (This is a static preview; backend can be added on request.)</p>
              </div>
            )}

            {current === 'management' && (
              <div className="bg-white border rounded-lg p-6 space-y-4">
                <h2 className="font-semibold">Customer & Employee Management</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="border rounded-md p-4">
                    <h3 className="font-medium mb-2">Customers</h3>
                    <p className="text-sm text-gray-600">Create customers, contacts and link active products. Assign SLAs and default priorities.</p>
                  </div>
                  <div className="border rounded-md p-4">
                    <h3 className="font-medium mb-2">Employees</h3>
                    <p className="text-sm text-gray-600">Manage support engineers and product owners. Define roles for ticket assignment and internal notes.</p>
                  </div>
                </div>
              </div>
            )}

            {current === 'settings' && (
              <div className="bg-white border rounded-lg p-6">
                <h2 className="font-semibold mb-2">Settings</h2>
                <p className="text-sm text-gray-600">Configure priorities, ticket types, and notification rules.</p>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
