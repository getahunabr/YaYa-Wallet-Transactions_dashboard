/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import { getTransactions, searchTransactions } from "@/lib/actions/yaya";
import React, { useState } from "react";

interface SearchBarProps {
  transactions: any[]; // all transactions
  onResults: (results: any[]) => void;
}
const SearchBar = ({ transactions, onResults }: SearchBarProps) => {
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState(""); // keep track of input

  const handleSearch = async (query: string) => {
    setLoading(true);
    try {
      if (!query.trim()) {
        const data = await getTransactions(1); // show first page if empty
        onResults(data?.data || []);
        return;
      }

      // If query is a display name with parentheses, extract the account inside
      const accountQueryMatch = query.match(/\(([^)]+)\)$/);
      const normalizedQuery = accountQueryMatch
        ? accountQueryMatch[1]
        : query.trim();

      // Call the server API to search across all transactions
      const result = await searchTransactions(normalizedQuery);
      onResults(result?.data || []); // display the server-side results
    } catch (error) {
      console.error("Search error:", error);
      onResults([]);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex items-center space-x-2">
      <input
        type="text"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
        }}
        name="query"
        placeholder="Search by sender,receiver,cause and Id"
        className="border rounded px-2 py-1 w-64"
      />
      <button
        onClick={() => handleSearch(query)}
        className="bg-red-50 text-black px-3 py-1 rounded "
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;
