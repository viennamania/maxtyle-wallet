import { NextResponse, type NextRequest } from "next/server";


import { processSettlement } from "@/lib/api/settlement";

export async function POST(request: NextRequest) {
  const {
    walletAddress,
    amount,
    bankInfo,
    settlementWalletAddress,
    transactionHash,
  } = await request.json();

  // Validate input
  if (!walletAddress || !amount || !bankInfo || !settlementWalletAddress || !transactionHash) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

 
  try {
    // Process the settlement
    const result = await processSettlement({
      walletAddress,
      amount,
      bankInfo,
      settlementWalletAddress,
      transactionHash: transactionHash, // Optional field
    });

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error("Error processing settlement:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}


