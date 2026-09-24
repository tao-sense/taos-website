"use client";

import { useState } from "react";

export default function InterestActions({
  emails,
  source,
}: {
  emails: string[];
  source?: string;
}) {
  const [copyLabel, setCopyLabel] = useState("Copy all emails");

  const deduped = [...new Set(emails.filter(Boolean))];

  function handleCopy() {
    navigator.clipboard.writeText(deduped.join(", ")).then(() => {
      setCopyLabel(`Copied ${deduped.length} email${deduped.length !== 1 ? "s" : ""}`);
      setTimeout(() => setCopyLabel("Copy all emails"), 2500);
    });
  }

  function handleDownload() {
    const params = new URLSearchParams();
    if (source) params.set("source", source);
    const qs = params.toString();
    window.location.href = `/api/admin/workshop-interest${qs ? `?${qs}` : ""}`;
  }

  return (
    <div className="flex flex-wrap gap-3 mb-8">
      <button
        onClick={handleCopy}
        disabled={deduped.length === 0}
        className="px-4 py-2 bg-gold text-black font-semibold rounded hover:bg-black hover:text-gold border border-gold transition text-sm disabled:opacity-40 disabled:cursor-not-allowed"
      >
        {copyLabel}
      </button>
      <button
        onClick={handleDownload}
        disabled={emails.length === 0}
        className="px-4 py-2 border border-gold text-gold font-semibold rounded hover:bg-gold hover:text-black transition text-sm disabled:opacity-40 disabled:cursor-not-allowed"
      >
        Download CSV
      </button>
    </div>
  );
}
