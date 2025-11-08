import React, { useMemo, useState } from 'react';
import { PlusCircle } from 'lucide-react';

const PRODUCTS = [
  { id: 'erp', name: 'ERP' },
  { id: 'hcm', name: 'HCM' },
  { id: 'crop', name: 'Crop Management' },
  { id: 'mapp', name: 'Mobile App Suite' },
];

const TYPES = [
  'New Requirement',
  'Missing Functionality',
  'Change Request',
  'Bug',
];

const PRIORITIES = ['Show Stopper', 'High', 'Medium', 'Low'];

export default function TicketForm({ onCreate }) {
  const [form, setForm] = useState({
    title: '',
    product: 'erp',
    productVersion: '',
    screen: '',
    type: 'Bug',
    priority: 'Medium',
    description: '',
  });

  const isValid = useMemo(() => {
    return (
      form.title.trim() &&
      form.product &&
      form.productVersion.trim() &&
      form.screen.trim() &&
      form.description.trim()
    );
  }, [form]);

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const submit = (e) => {
    e.preventDefault();
    if (!isValid) return;
    onCreate?.({ ...form, id: crypto.randomUUID(), createdAt: new Date().toISOString(), status: 'Open' });
    setForm({ title: '', product: 'erp', productVersion: '', screen: '', type: 'Bug', priority: 'Medium', description: '' });
  };

  return (
    <form onSubmit={submit} className="bg-white rounded-lg border p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="font-semibold">Raise a Ticket</h2>
        <button
          type="submit"
          disabled={!isValid}
          className={`inline-flex items-center gap-2 px-3 py-2 rounded-md text-white text-sm ${
            isValid ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-indigo-300 cursor-not-allowed'
          }`}
        >
          <PlusCircle size={16} /> Create Ticket
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="text-sm text-gray-600">Title</label>
          <input className="w-full border rounded-md px-3 py-2" value={form.title} onChange={update('title')} />
        </div>
        <div className="space-y-1">
          <label className="text-sm text-gray-600">Product</label>
          <select className="w-full border rounded-md px-3 py-2" value={form.product} onChange={update('product')}>
            {PRODUCTS.map((p) => (
              <option key={p.id} value={p.id}>{p.name}</option>
            ))}
          </select>
        </div>
        <div className="space-y-1">
          <label className="text-sm text-gray-600">Product Version</label>
          <input className="w-full border rounded-md px-3 py-2" value={form.productVersion} onChange={update('productVersion')} placeholder="e.g., v2.3.1" />
        </div>
        <div className="space-y-1">
          <label className="text-sm text-gray-600">Screen / Module</label>
          <input className="w-full border rounded-md px-3 py-2" value={form.screen} onChange={update('screen')} placeholder="e.g., Sales > Orders" />
        </div>
        <div className="space-y-1">
          <label className="text-sm text-gray-600">Type</label>
          <select className="w-full border rounded-md px-3 py-2" value={form.type} onChange={update('type')}>
            {TYPES.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>
        <div className="space-y-1">
          <label className="text-sm text-gray-600">Priority</label>
          <select className="w-full border rounded-md px-3 py-2" value={form.priority} onChange={update('priority')}>
            {PRIORITIES.map((p) => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="space-y-1">
        <label className="text-sm text-gray-600">Description</label>
        <textarea className="w-full border rounded-md px-3 py-2 min-h-[120px]" value={form.description} onChange={update('description')} placeholder="Describe the issue, steps, expected vs actual..." />
      </div>
    </form>
  );
}
