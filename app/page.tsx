"use client";
import { getTransactions } from "@/lib/actions/yaya";
import SearchBar from "./components/SearchBar";
import TransactionTable from "./components/TransactionTable";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

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
    <main className=" bg-gray-50 flex flex-col items-center px-4 py-6">
      <header className="w-full max-w-5xl text-center mb-8">
        <div className="fixed top-4 left-4">
          <Link href="/" className="shrink-0">
            <Image
              src="/logo.svg"
              alt="logo"
              height={80}
              width={80}
              className="h-auto w-20 sm:w-24"
            />
          </Link>
        </div>
        <h1 className="text-4xl font-bold mb-4 text-center">
          YaYa Wallet Transactions
        </h1>
        <p className="text-gray-500 text-sm sm:text-base">
          View, search, and manage your latest wallet transactions
        </p>
      </header>
      <div className="w-full flex justify-end px-6 py-4 bg-white shadow">
        <div className="w-full max-w-3xl">
          <SearchBar transactions={transactions} onResults={setTransactions} />
        </div>
      </div>
      <section className=" w-full  bg-white shadow-md rounded-2xl p-4 sm:p-6">
        <TransactionTable
          transactions={transactions}
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={fetchPage}
        />
      </section>
    </main>
  );
}
