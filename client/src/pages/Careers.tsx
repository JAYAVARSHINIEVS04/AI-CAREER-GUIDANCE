import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { careerService } from "../services/careerService";

export default function Careers() {
  const [search, setSearch] = useState("");

  const { data, isLoading, isError } = useQuery({
    queryKey: ["careers", search],
    queryFn: () => careerService.getAll(search),
  });

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Explore Careers</h1>

      <input
        type="text"
        placeholder="Search careers (e.g. data science, design)..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full max-w-md px-4 py-2.5 rounded-xl border border-gray-300 dark:border-white/20 bg-white/50 dark:bg-white/5 mb-8 focus:outline-none focus:ring-2 focus:ring-primary-500"
      />

      {isLoading && <p>Loading careers...</p>}
      {isError && <p className="text-red-500">Failed to load careers. Is the backend running?</p>}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {data?.careers.map((career) => (
          <div key={career._id} className="glass-card p-6">
            <h2 className="text-lg font-semibold mb-2">{career.title}</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
              {career.description}
            </p>
            <span className="text-xs px-3 py-1 rounded-full bg-primary-100 text-primary-700 dark:bg-primary-500/20 dark:text-primary-300">
              {career.industry}
            </span>
          </div>
        ))}
      </div>

      {data && data.careers.length === 0 && (
        <p className="text-gray-500 mt-6">No careers found. Try a different search.</p>
      )}
    </div>
  );
}
