"use client";

import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

function SummaryBox({ text }: { text: string }) {
  const [expanded, setExpanded] = useState(false);

  const isLong = text.length > 60;
  const displayText =
    expanded || !isLong ? text : text.slice(0, 60) + "...";

  return (
    <div className="bg-blue-950 border border-blue-700 p-3 rounded text-sm">
      <strong>Summary:</strong> {displayText}

      {isLong && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="ml-2 text-blue-300 underline text-xs"
        >
          {expanded ? "Show less" : "Read more"}
        </button>
      )}
    </div>
  );
}

export default function Home() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [search, setSearch] = useState("");
  const [notes, setNotes] = useState<any[]>([]);

  const loadNotes = async () => {
    const { data, error } = await supabase
      .from("notes")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Load error:", error);
      setNotes([]);
      return;
    }

    setNotes(data || []);
  };

  async function addNote() {
    if (!title || !content) return;

    await fetch("/api/add-note", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, content }),
    });

    setTitle("");
    setContent("");
    loadNotes();
  }

  async function deleteNote(id: string) {
    await supabase.from("notes").delete().eq("id", id);
    loadNotes();
  }

  useEffect(() => {
    loadNotes();
  }, []);

  const filteredNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(search.toLowerCase()) ||
    note.content.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="max-w-2xl mx-auto p-6 space-y-6">
      <h1 className="text-4xl font-bold text-center">Second Brain</h1>

      {/* Add note form */}
      <div className="space-y-3">
        <input
          className="w-full border border-zinc-700 bg-zinc-900 p-2 rounded"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          className="w-full border border-zinc-700 bg-zinc-900 p-2 rounded"
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button
          onClick={addNote}
          className="bg-black text-white px-4 py-2 rounded"
        >
          Add Note
        </button>
      </div>

      {/* Search */}
      <input
        className="w-full border border-zinc-700 bg-zinc-900 p-2 rounded"
        placeholder="Search notes..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Notes list */}
      <div className="space-y-4">
        {filteredNotes.length === 0 && (
          <div className="text-center text-zinc-500 py-10">
            No notes found.
          </div>
        )}

        {filteredNotes.map((note) => (
          <div
            key={note.id}
            className="bg-zinc-900 border border-zinc-700 p-5 rounded-xl shadow-md space-y-3"
          >
            <div className="flex justify-between items-start">
              <h2 className="text-lg font-semibold">{note.title}</h2>
              <button
                onClick={() => deleteNote(note.id)}
                className="text-red-400 text-sm hover:underline"
              >
                Delete
              </button>
            </div>

            <p className="text-sm text-zinc-300">{note.content}</p>

            <div className="flex gap-2">
              <button
                onClick={async () => {
                  const res = await fetch("/api/summarize", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ content: note.content }),
                  });

                  const data = await res.json();

                  await fetch("/api/update-note", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                      id: note.id,
                      summary: data.summary,
                    }),
                  });

                  await loadNotes();
                }}
                className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm"
              >
                Summarize
              </button>

              <button
                onClick={async () => {
                  const res = await fetch("/api/tags", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ content: note.content }),
                  });

                  const data = await res.json();

                  await fetch("/api/update-note", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                      id: note.id,
                      tags: data.tags,
                    }),
                  });

                  await loadNotes();
                }}
                className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm"
              >
                Auto-tag
              </button>
            </div>

            {note.summary && <SummaryBox text={note.summary} />}

            {note.tags && (
              <div className="flex gap-2 flex-wrap">
                {note.tags.split(",").map((tag: string, i: number) => (
                  <span
                    key={i}
                    className="bg-zinc-800 text-xs px-2 py-1 rounded-full border border-zinc-600"
                  >
                    {tag.trim()}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </main>
  );
}
