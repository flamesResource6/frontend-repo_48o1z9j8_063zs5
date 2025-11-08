import React, { useMemo, useState } from 'react';

function Badge({ children, color = 'gray' }) {
  const map = {
    red: 'bg-red-50 text-red-700 ring-red-200',
    orange: 'bg-orange-50 text-orange-700 ring-orange-200',
    amber: 'bg-amber-50 text-amber-700 ring-amber-200',
    emerald: 'bg-emerald-50 text-emerald-700 ring-emerald-200',
    indigo: 'bg-indigo-50 text-indigo-700 ring-indigo-200',
    gray: 'bg-gray-50 text-gray-700 ring-gray-200',
  };
  return (
    <span className={`px-2 py-0.5 text-xs rounded-full ring-1 ${map[color]}`}>{children}</span>
  );
}

export default function TicketDetail({ ticket, onAddMessage }) {
  const [tab, setTab] = useState('customer');
  const [message, setMessage] = useState('');

  const priorityColor = useMemo(() => {
    if (!ticket) return 'gray';
    return ticket.priority === 'Show Stopper'
      ? 'red'
      : ticket.priority === 'High'
      ? 'orange'
      : ticket.priority === 'Medium'
      ? 'amber'
      : 'emerald';
  }, [ticket]);

  if (!ticket) {
    return (
      <div className="bg-white rounded-lg border p-6 text-sm text-gray-500">Select a ticket to view details.</div>
    );
  }

  const send = (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    onAddMessage?.({
      ticketId: ticket.id,
      channel: tab,
      text: message,
      createdAt: new Date().toISOString(),
      id: crypto.randomUUID(),
    });
    setMessage('');
  };

  return (
    <div className="bg-white rounded-lg border overflow-hidden">
      <div className="px-4 py-3 border-b flex items-center justify-between">
        <div>
          <div className="font-semibold">{ticket.title}</div>
          <div className="text-xs text-gray-500 mt-0.5 flex items-center gap-2">
            <Badge color="indigo">{ticket.type}</Badge>
            <Badge color={priorityColor}>{ticket.priority}</Badge>
            <span>•</span>
            <span className="uppercase">{ticket.product}</span>
            <span>v{ticket.productVersion}</span>
            <span>• {ticket.screen}</span>
          </div>
        </div>
        <div className="text-xs text-gray-500">Opened {new Date(ticket.createdAt).toLocaleString()}</div>
      </div>

      <div className="flex border-b">
        <button onClick={() => setTab('customer')} className={`px-4 py-2 text-sm border-b-2 ${tab === 'customer' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-gray-600'}`}>Customer</button>
        <button onClick={() => setTab('internal')} className={`px-4 py-2 text-sm border-b-2 ${tab === 'internal' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-gray-600'}`}>Internal</button>
      </div>

      <div className="p-4 space-y-3">
        {ticket.messages?.filter(m => m.channel === tab).length === 0 && (
          <div className="text-sm text-gray-500">No messages yet in this thread.</div>
        )}
        {ticket.messages?.filter(m => m.channel === tab).map((m) => (
          <div key={m.id} className="text-sm">
            <div className="text-gray-800">{m.text}</div>
            <div className="text-xs text-gray-500">{new Date(m.createdAt).toLocaleString()}</div>
          </div>
        ))}
      </div>

      <form onSubmit={send} className="p-4 border-t flex items-center gap-2">
        <input
          className="flex-1 border rounded-md px-3 py-2"
          placeholder={`Add a ${tab} note...`}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button type="submit" className="px-3 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md text-sm">Send</button>
      </form>
    </div>
  );
}
