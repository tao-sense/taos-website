"use client";

import { useState, useEffect } from "react";

export default function WorkshopForm({
  onSaved,
  existing,
}: {
  onSaved?: () => void;
  existing?: any;
}) {
  const [form, setForm] = useState({
    id: "",
    title: "",
    description: "",
    date: "",
    location: "",
    link: "",
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
      });
    } else {
      setForm({
        id: "",
        title: "",
        description: "",
        date: "",
        location: "",
        link: "",
      });
    }
  }, [existing]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const method = form.id ? "PUT" : "POST";
    const url = form.id
      ? `/api/admin/workshops/${form.id}`
      : "/api/admin/workshops";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
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
      });
    } else {
      alert("Error saving workshop");
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

      <button
        type="submit"
        className="bg-gold text-black px-4 py-2 rounded font-semibold hover:bg-black hover:text-gold transition"
      >
        {form.id ? "Save Changes" : "Create Workshop"}
      </button>
    </form>
  );
}