'use client';

import { useState } from 'react';
import { useStore } from '../../store/useStore';
import { MapPin, Plus, Trash2, X } from 'lucide-react';

const emptyForm = { name: '', street: '', city: '', state: '', zip: '', phone: '' };

export default function AddressesPage() {
  const { addresses, addAddress, removeAddress } = useStore();
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Required';
    if (!form.street.trim()) e.street = 'Required';
    if (!form.city.trim()) e.city = 'Required';
    if (!form.state.trim()) e.state = 'Required';
    if (!form.zip.trim()) e.zip = 'Required';
    if (!form.phone.trim()) e.phone = 'Required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    addAddress(form);
    setForm(emptyForm);
    setShowForm(false);
    setErrors({});
  };

  const inputClass = (field) =>
    `w-full border ${
      errors[field] ? 'border-red-300' : 'border-zinc-200 focus:border-zinc-900'
    } px-4 py-3 text-sm outline-none transition-colors`;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-medium text-zinc-900">Saved Addresses</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 text-xs tracking-[0.15em] uppercase text-zinc-500 hover:text-zinc-900 transition-colors"
        >
          {showForm ? <X size={14} /> : <Plus size={14} />}
          {showForm ? 'Cancel' : 'Add New'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="border border-zinc-200 p-6 mb-6 space-y-4">
          <input
            placeholder="Full Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className={inputClass('name')}
          />
          <input
            placeholder="Street Address"
            value={form.street}
            onChange={(e) => setForm({ ...form, street: e.target.value })}
            className={inputClass('street')}
          />
          <div className="grid grid-cols-2 gap-4">
            <input
              placeholder="City"
              value={form.city}
              onChange={(e) => setForm({ ...form, city: e.target.value })}
              className={inputClass('city')}
            />
            <input
              placeholder="State"
              value={form.state}
              onChange={(e) => setForm({ ...form, state: e.target.value })}
              className={inputClass('state')}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <input
              placeholder="ZIP / Postal Code"
              value={form.zip}
              onChange={(e) => setForm({ ...form, zip: e.target.value })}
              className={inputClass('zip')}
            />
            <input
              placeholder="Phone"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className={inputClass('phone')}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-zinc-900 text-white py-3 text-xs tracking-[0.15em] uppercase font-medium hover:bg-zinc-800 transition-colors"
          >
            Save Address
          </button>
        </form>
      )}

      {addresses.length === 0 && !showForm && (
        <div className="border border-zinc-200 p-12 text-center">
          <MapPin size={32} className="text-zinc-200 mx-auto mb-4" />
          <p className="text-sm text-zinc-400">No saved addresses</p>
        </div>
      )}

      {addresses.length > 0 && (
        <div className="space-y-4">
          {addresses.map((addr) => (
            <div key={addr.id} className="border border-zinc-200 p-6 flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-zinc-900">{addr.name}</p>
                <p className="text-sm text-zinc-500 mt-1">{addr.street}</p>
                <p className="text-sm text-zinc-500">
                  {addr.city}, {addr.state} {addr.zip}
                </p>
                <p className="text-xs text-zinc-400 mt-2">{addr.phone}</p>
              </div>
              <button
                onClick={() => removeAddress(addr.id)}
                className="text-zinc-300 hover:text-red-500 transition-colors p-1"
                aria-label="Delete address"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
