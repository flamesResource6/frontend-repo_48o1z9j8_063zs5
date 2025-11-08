import React from 'react';

export default function TicketList({ tickets, onSelect }) {
  return (
    <div className="bg-white rounded-lg border overflow-hidden">
      <div className="px-4 py-3 border-b flex items-center justify-between">
        <h2 className="font-semibold">Recent Tickets</h2>
      </div>
      <div className="divide-y">
        {tickets.length === 0 && (
          <div className="p-6 text-sm text-gray-500">No tickets yet. Create your first ticket using the form.</div>
        )}
        {tickets.map((t) => (
          <button
            key={t.id}
            onClick={() => onSelect?.(t)}
            className="w-full text-left px-4 py-3 hover:bg-gray-50 flex items-start gap-3"
          >
            <div className={`h-2.5 w-2.5 mt-1 rounded-full ${
              t.priority === 'Show Stopper' ? 'bg-red-600' :
              t.priority === 'High' ? 'bg-orange-500' :
              t.priority === 'Medium' ? 'bg-amber-400' : 'bg-emerald-500'
            }`} />
            <div className="flex-1">
              <div className="font-medium">{t.title}</div>
              <div className="text-xs text-gray-500 mt-0.5">
                {t.type} • {t.product.toUpperCase()} • v{t.productVersion} • {t.screen}
              </div>
            </div>
            <div className="text-xs text-gray-500">{new Date(t.createdAt).toLocaleString()}</div>
          </button>
        ))}
      </div>
    </div>
  );
}
