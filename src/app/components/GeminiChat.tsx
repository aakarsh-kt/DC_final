// components/GeminiChat.tsx
"use client";
import { useState } from "react";
import { getGeminiResponse } from "@/lib/gemini";

export default function GeminiChat() {
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const result = await getGeminiResponse(query);
    setResponse(result);
    setLoading(false);
  }

  return (
    <div className="bg-gray-700 text-white p-6 rounded-xl max-w-xl mx-auto shadow-lg">
      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea
          className="w-full p-3 bg-gray-800 rounded text-white"
          rows={4}
          placeholder="Ask me anything about Indian culture..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          type="submit"
          className="bg-sky-500 hover:bg-sky-600 px-4 py-2 rounded font-semibold"
        >
          {loading ? "Thinking..." : "Ask"}
        </button>
      </form>

      {response && (
        <div className="mt-6 bg-gray-800 p-4 rounded text-sky-300 whitespace-pre-line">
          <strong>Gemini:</strong> {response}
        </div>
      )}
    </div>
  );
}
