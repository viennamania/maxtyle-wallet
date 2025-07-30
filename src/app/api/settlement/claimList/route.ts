import { NextResponse, type NextRequest } from "next/server";

import { getAllSettlementsByWalletAddress } from "@/lib/api/settlement";


export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const walletAddress = searchParams.get("walletAddress");

  // Validate input
  if (!walletAddress) {
    return NextResponse.json({ error: "Missing wallet address" }, { status: 400 });
  }

  try {
    // Retrieve all settlements for the given wallet address
    const settlements = await getAllSettlementsByWalletAddress(walletAddress);

    return NextResponse.json(settlements, { status: 200 });
  } catch (error) {
    console.error("Error retrieving settlements:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}