import { NextResponse, type NextRequest } from "next/server";

import {
	updateOneBlockStatus,
} from '@lib/api/user';



export async function POST(request: NextRequest) {

  const body = await request.json();

  const { walletAddress, isBlocked } = body;

  console.log("walletAddress", walletAddress);
  console.log("isBlocked", isBlocked);

  const result = await updateOneBlockStatus({
    walletAddress: walletAddress,
    isBlocked: isBlocked,
  });

  console.log("result", result);

 
  return NextResponse.json({

    result,
    
  });
  
}
