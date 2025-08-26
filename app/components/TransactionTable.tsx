"use client";

import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { getTransactions } from "@/lib/actions/yaya";

interface TransactionTableProps {
  transactions: any[];
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const TransactionTable = ({
  transactions,
  totalPages,
  currentPage,
  onPageChange,
}: TransactionTableProps) => {
  if (!transactions || transactions.length === 0) {
    return <div>No transactions found.</div>;
  }

  console.log(transactions);
  return (
    <div className="overflow-x-auto w-full">
      <Table className="min-w-[700px] border border-gray-300 text-sm">
        <TableCaption className="text-left">
          A List of your recent Transactions.
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[120px]">TransactionID</TableHead>
            <TableHead className="hidden sm:table-cell">Sender</TableHead>
            <TableHead className="hidden sm:table-cell">Receiver</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead className="hidden md:table-cell">Currency</TableHead>
            <TableHead className="hidden lg:table-cell">Cause</TableHead>
            <TableHead className="text-right">CreatedAt</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.map((transaction) => {
            const isComing =
              transaction.sender?.account === transaction.receiver?.account ||
              transaction.receiver?.account === "CURRENT_USER";
            return (
              <TableRow
                key={transaction.id}
                className={isComing ? "bg-green-50" : "bg-red-50"}
              >
                <TableCell className="font-medium">{transaction.id}</TableCell>
                <TableCell className="hidden sm:table-cell">
                  {transaction.sender?.name ?? "N/A"} (
                  {transaction.sender?.account ?? "-"})
                </TableCell>
                <TableCell className="hidden sm:table-cell">
                  {transaction.receiver?.name ?? "N/A"} (
                  {transaction.receiver?.account ?? "-"})
                </TableCell>
                <TableCell>{transaction.amount}</TableCell>
                <TableCell className="hidden md:table-cell">
                  {transaction.currency}
                </TableCell>
                <TableCell className="hidden lg:table-cell">
                  {transaction.cause}
                </TableCell>

                <TableCell className="text-right">
                  {new Date(
                    transaction.created_at_time * 1000
                  ).toLocaleString()}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      {/* Pagination */}
      <div className="mt-4 flex justify-center">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  if (currentPage > 1) onPageChange(currentPage - 1);
                }}
              />
            </PaginationItem>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <PaginationItem key={page}>
                <PaginationLink
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    onPageChange(page);
                  }}
                  className={page === currentPage ? "font-bold" : ""}
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  if (currentPage < totalPages) onPageChange(currentPage + 1);
                }}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
};

export default TransactionTable;
