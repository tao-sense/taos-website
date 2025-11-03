"use client";

import { useState, useEffect } from "react";
import WorkshopForm from "./workshops/workshop-form";

export default function AdminWorkshopsPage() {
  const [workshops, setWorkshops] = useState<any[]>([]);
  const [refresh, setRefresh] = useState(false);
  const [editing, setEditing] = useState<any | null>(null);

  // Fetch workshops from API
  useEffect(() => {
    const fetchWorkshops = async () => {
      const res = await fetch("/api/admin/workshops");
      const data = await res.json();
      setWorkshops(data);
    };
    fetchWorkshops();
  }, [refresh]);

  // Delete workshop
  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this workshop?")) return;
    const res = await fetch(`/api/admin/workshops/${id}`, { method: "DELETE" });
    if (res.ok) {
      alert("Workshop deleted");
      setRefresh(!refresh);
    } else {
      alert("Error deleting workshop");
    }
  };

  return (
    <main className="bg-black text-white min-h-screen p-10">
      <h1 className="text-3xl font-bold text-gold mb-8">Admin | Workshops</h1>

      {/* Create / Edit Form */}
      <WorkshopForm
        onSaved={() => {
          setRefresh(!refresh);
          setEditing(null);
        }}
        existing={editing}
      />

      <div className="mt-16">
        <h2 className="text-2xl font-semibold text-gold mb-6">Existing Workshops</h2>

        {workshops.length === 0 ? (
          <p>No workshops found.</p>
        ) : (
          <div className="space-y-6">
            {workshops.map((w) => (
              <div
                key={w.id}
                className="bg-white text-black p-6 rounded-lg shadow flex justify-between items-start"
              >
                <div>
                  <h3 className="text-xl font-semibold text-gold">{w.title}</h3>
                  <p className="text-black/70">
                    {new Date(w.date).toLocaleDateString("en-GB", {
                      weekday: "long",
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                  <p className="mt-2">{w.description}</p>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setEditing(w)}
                    className="bg-gold text-black px-3 py-2 rounded hover:bg-black hover:text-gold transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(w.id)}
                    className="bg-red-600 text-white px-3 py-2 rounded hover:bg-black transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}