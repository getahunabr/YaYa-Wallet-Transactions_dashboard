/* eslint-disable @typescript-eslint/no-explicit-any */

"use server";

import crypto from "crypto";

function getTimestamp() {
  return Date.now().toString();
}

function getSignature(
  apiSecret: string,
  timestamp: string,
  method: string,
  endpoint: string,
  body: string
) {
  const preHash = timestamp + method + endpoint + body;
  const hmac = crypto.createHmac("sha256", apiSecret);
  hmac.update(preHash);
  return hmac.digest("base64");
}

export async function getTransactions(page: number = 1) {
  const endpoint = `/api/en/transaction/find-by-user`;
  const url = `https://sandbox.yayawallet.com${endpoint}?p=${page}`;
  const method = "GET";
  const body = "";
  const timestamp = getTimestamp();
  const signature = getSignature(
    process.env.YAYA_API_SECRET!,
    timestamp,
    method,
    endpoint,
    body
  );
  console.log("Fetching transactions for page:", page);
  console.log("Timestamp:", timestamp);
  console.log("Signature:", signature);

  const response = await fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
      "YAYA-API-KEY": process.env.YAYA_API_KEY!,
      "YAYA-API-TIMESTAMP": timestamp,
      "YAYA-API-SIGN": signature,
    },
    cache: "no-store",
  });

  const data = await response.json();
  console.log(data);
  return data;
}
export async function searchTransactions(query: string) {
  try {
    const endpoint = `/api/en/transaction/search`;
    const url = `https://sandbox.yayawallet.com${endpoint}`;
    const method = "POST";

    const body = JSON.stringify({ query });

    const timestamp = getTimestamp();
    const signature = getSignature(
      process.env.YAYA_API_SECRET!,
      timestamp,
      method,
      endpoint,
      body
    );

    console.log("Searching transactions with query:", query);
    console.log("Timestamp:", timestamp);
    console.log("Signature:", signature);

    const response = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        "YAYA-API-KEY": process.env.YAYA_API_KEY!,
        "YAYA-API-TIMESTAMP": timestamp,
        "YAYA-API-SIGN": signature,
      },
      body,
      cache: "no-store",
    });

    if (!response.ok) {
      const text = await response.text();
      throw new Error(`HTTP ${response.status}: ${text}`);
    }

    const data = await response.json();
    console.log("Search results:", data);
    return data;
  } catch (error) {
    console.error("Error searching transactions:", error);
    throw error;
  }
}
