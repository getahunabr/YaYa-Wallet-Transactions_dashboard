"use client";
import { getTransactions } from "@/lib/actions/yaya";
import SearchBar from "./components/SearchBar";
import TransactionTable from "./components/TransactionTable";
import { useEffect, useState } from "react";

export default function Home() {
  const [transactions, setTransactions] = useState<any[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchPage = async (page: number) => {
    try {
      setLoading(true);
      const data = await getTransactions(page);
      setTransactions(data?.data || []);
      setTotalPages(data?.lastPage || 1);
      setCurrentPage(page);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPage(1);
  }, []);

  if (loading) {
    return <div className="p-6 text-center">Loading transactions...</div>;
  }

  return (
    <main className="p-6">
      <h1 className="text-4xl font-bold mb-4 text-center">
        YaYa Wallet Transactions
      </h1>
      <SearchBar onResults={setTransactions} />

      <TransactionTable
        transactions={transactions}
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={fetchPage}
      />
    </main>
  );
}
