import { NextResponse, type NextRequest } from "next/server";




export async function POST(request: NextRequest) {

  const body = await request.json();


  const { orderId } = body;




  const stableUrl = "https://www.cryptopay.beauty";

  // call api
  const response = await fetch(`${stableUrl}/api/order/getOneBuyOrder`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      orderId,
    }),
  });

  if (!response.ok) {
    console.error("Error fetching order details:", response.statusText);
    return NextResponse.json({ error: "Failed to fetch order details" }, { status: 500 });
  }

  const data = await response.json();

  //console.log("Fetched order details:", data);
  // Fetched order details: { result: { totalCount: 1, orders: [ [Object] ] } }



  return NextResponse.json({
    result: data.result,
  });
}
