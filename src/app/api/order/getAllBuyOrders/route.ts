import { NextResponse, type NextRequest } from "next/server";


export async function POST(request: NextRequest) {

  const body = await request.json();

  const {
    agentcode,
    storecode,
    limit,
    page,
    walletAddress,
    searchMyOrders,
    searchOrderStatusCancelled,
    searchOrderStatusCompleted,

    searchStoreName,

    privateSale,

    searchBuyer,
    searchDepositName,

    searchStoreBankAccountNumber,

    fromDate,
    toDate,


  } = body;


  console.log("getAllBuyOrders fromDate", fromDate);
  console.log("getAllBuyOrders toDate", toDate);



  

  ///console.log("getAllBuyOrders body", body);



  // when fromDate is "" or undefined, set it to 30 days ago
  if (!fromDate || fromDate === "") {
    const date = new Date();
    date.setDate(date.getDate() - 30);
    body.fromDate = date.toISOString().split("T")[0]; // YYYY-MM-DD format
  }

  // when toDate is "" or undefined, set it to today
  if (!toDate || toDate === "") {
    const date = new Date();
    body.toDate = date.toISOString().split("T")[0]; // YYYY-MM-DD format
  }




  const stableUrl = "https://www.cryptopay.beauty";

  // call api
  const response = await fetch(`${stableUrl}/api/order/getAllBuyOrders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      agentcode,
      storecode,
      limit,
      page,
      walletAddress,
      searchMyOrders,
      searchOrderStatusCancelled,
      searchOrderStatusCompleted,

      searchStoreName,

      privateSale,

      searchBuyer,
      searchDepositName,

      searchStoreBankAccountNumber,

      fromDate,
      toDate,

    }),
  });

  const result = await response.json();
  if (!response.ok) {
    console.error("Error fetching orders:", result.error || response.statusText);
    return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 });
  }

  //console.log("Fetched orders:", result.result.orders);



  return NextResponse.json({
    result: result.result,
  });

}
