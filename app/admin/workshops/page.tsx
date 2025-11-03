"use client";

import { useState, useEffect } from "react";
import WorkshopForm from "./workshop-form";

export default function AdminWorkshopsPage() {
  const [workshops, setWorkshops] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch workshops on mount + after changes
  useEffect(() => {
    fetchWorkshops();
  }, []);

  async function fetchWorkshops() {
    setLoading(true);
    const res = await fetch("/api/admin/workshops");
    if (res.ok) {
      const data = await res.json();
      setWorkshops(data);
    }
    setLoading(false);
  }

  async function handleDelete(id: string) {
    if (!confirm("Are you sure you want to delete this workshop?")) return;
    const res = await fetch(`/api/admin/workshops/${id}`, { method: "DELETE" });
    if (res.ok) {
      setWorkshops((prev) => prev.filter((w) => w.id !== id));
    }
  }

  return (
    <main className="bg-black text-white min-h-screen p-10">
      <h1 className="text-3xl font-bold text-gold mb-8">Admin | Workshops</h1>

      {/* Form */}
      <WorkshopForm onSaved={fetchWorkshops} />

      {/* Workshop list */}
      <section className="mt-12">
        <h2 className="text-2xl font-semibold text-gold mb-4">Existing Workshops</h2>
        {loading ? (
          <p>Loading...</p>
        ) : workshops.length === 0 ? (
          <p className="text-white/70">No workshops yet.</p>
        ) : (
          <table className="w-full border border-gold text-left bg-white text-black rounded-lg overflow-hidden">
            <thead className="bg-gold text-black">
              <tr>
                <th className="p-3">Title</th>
                <th className="p-3">Date</th>
                <th className="p-3">Location</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {workshops.map((w) => (
                <tr key={w.id} className="border-t border-gold">
                  <td className="p-3">{w.title}</td>
                  <td className="p-3">
                    {new Date(w.date).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </td>
                  <td className="p-3">{w.location || "-"}</td>
                  <td className="p-3 space-x-3">
                    {/* Edit button can open modal later */}
                    <button
                      onClick={() => alert("Edit coming soon")}
                      className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(w.id)}
                      className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </main>
  );
}