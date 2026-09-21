"use client";

import { useState, useEffect } from "react";

interface WorkshopFormProps {
  onSaved?: () => void;
  existing?: any;
}

export default function WorkshopForm({ onSaved, existing }: WorkshopFormProps) {
  const [form, setForm] = useState({
    id: "",
    title: "",
    description: "",
    date: "",
    location: "",
    link: "",
    published: false,
    priceGbp: "",
    capacity: "",
  });

  useEffect(() => {
    if (existing) {
      setForm({
        id: existing.id,
        title: existing.title,
        description: existing.description || "",
        date: existing.date
          ? new Date(existing.date).toISOString().slice(0, 16)
          : "",
        location: existing.location || "",
        link: existing.link || "",
        published: Boolean(existing.published),
        priceGbp:
          existing.priceCents > 0
            ? (existing.priceCents / 100).toFixed(2)
            : "",
        capacity: existing.capacity != null ? String(existing.capacity) : "",
      });
    } else {
      setForm({
        id: "",
        title: "",
        description: "",
        date: "",
        location: "",
        link: "",
        published: false,
        priceGbp: "",
        capacity: "",
      });
    }
  }, [existing]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const method = form.id ? "PUT" : "POST";
    const url = form.id
      ? `/api/admin/workshops/${form.id}`
      : "/api/admin/workshops";

    const priceCents = form.priceGbp
      ? Math.round(parseFloat(form.priceGbp) * 100)
      : 0;

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: form.title,
        description: form.description,
        date: form.date,
        location: form.location,
        link: form.link,
        published: form.published,
        priceCents,
        capacity: form.capacity ? parseInt(form.capacity, 10) : null,
      }),
    });

    if (res.ok) {
      alert(`Workshop ${form.id ? "updated" : "created"}!`);
      onSaved?.();
      setForm({
        id: "",
        title: "",
        description: "",
        date: "",
        location: "",
        link: "",
        published: false,
        priceGbp: "",
        capacity: "",
      });
    } else {
      const err = await res.json().catch(() => ({}));
      alert(err.error || "Error saving workshop");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 max-w-lg bg-white text-black p-6 rounded-lg"
    >
      <h2 className="text-xl font-semibold text-gold mb-2">
        {form.id ? "Edit Workshop" : "Create New Workshop"}
      </h2>

      <input
        type="text"
        placeholder="Title"
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
        className="w-full border p-2 rounded"
        required
      />
      <textarea
        placeholder="Description"
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
        className="w-full border p-2 rounded"
        required
      />
      <input
        type="datetime-local"
        value={form.date}
        onChange={(e) => setForm({ ...form, date: e.target.value })}
        className="w-full border p-2 rounded"
        required
      />
      <input
        type="text"
        placeholder="Location"
        value={form.location}
        onChange={(e) => setForm({ ...form, location: e.target.value })}
        className="w-full border p-2 rounded"
      />
      <input
        type="text"
        placeholder="Booking Link"
        value={form.link}
        onChange={(e) => setForm({ ...form, link: e.target.value })}
        className="w-full border p-2 rounded"
      />

      <div className="flex gap-4">
        <div className="flex-1">
          <label className="block text-sm font-medium mb-1">Price (£)</label>
          <input
            type="number"
            min="0"
            step="0.01"
            placeholder="0.00"
            value={form.priceGbp}
            onChange={(e) => setForm({ ...form, priceGbp: e.target.value })}
            className="w-full border p-2 rounded"
          />
        </div>
        <div className="flex-1">
          <label className="block text-sm font-medium mb-1">Capacity</label>
          <input
            type="number"
            min="1"
            step="1"
            placeholder="e.g. 12"
            value={form.capacity}
            onChange={(e) => setForm({ ...form, capacity: e.target.value })}
            className="w-full border p-2 rounded"
          />
        </div>
      </div>

      <label className="flex items-center gap-2 cursor-pointer select-none">
        <input
          type="checkbox"
          checked={form.published}
          onChange={(e) => setForm({ ...form, published: e.target.checked })}
          className="w-4 h-4"
        />
        <span className="text-sm font-medium">Published (visible to public)</span>
      </label>

      <button
        type="submit"
        className="bg-gold text-black px-4 py-2 rounded font-semibold hover:bg-black hover:text-gold transition"
      >
        {form.id ? "Save Changes" : "Create Workshop"}
      </button>
    </form>
  );
}
