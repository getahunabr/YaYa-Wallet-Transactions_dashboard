"use client";

import { getTransactions, searchTransactions } from "@/lib/actions/yaya";
import React, { useState } from "react";

const SearchBar = ({ onResults }: { onResults: (results: any[]) => void }) => {
  const [loading, setLoading] = useState(false);

  const handleSearch = async (query: string) => {
    setLoading(true);
    try {
      if (!query.trim()) {
        const data = await getTransactions(1);
        onResults(data?.data || []);
        return;
      }
      // search by all feild
      const result = await searchTransactions({
        id: query,
        sender: query,
        receiver: query,
        cause: query,
      });
      onResults(result?.data || []);
    } catch (error) {
      console.error("Search error:", error);
      onResults([]);
    } finally {
      setLoading(false);
    }
  };
  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const query = formData.get("query") as string;
        handleSearch(query);
      }}
      className="flex items-center space-x-2"
    >
      <input
        type="text"
        name="query"
        placeholder="Search by sender,receiver,cause and Id"
        className="border rounded px-2 py-1 w-64"
      />
      <button className="bg-blue-600 text-white px-3 py-1 rounded ">
        Search
      </button>
    </form>
  );
};

export default SearchBar;
