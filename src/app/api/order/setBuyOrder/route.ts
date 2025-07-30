import { NextResponse, type NextRequest } from "next/server";




/*
Response body: {"result":null,"error":"Failed to insert buy order"}
*/

export async function POST(request: NextRequest) {

  const body = await request.json();

  const {
    clientid,
    storecode,
    walletAddress,
    nickname,
    usdtAmount,
    krwAmount,
    rate,
    privateSale,
    buyer
  } = body;




  // api call

  try {

    const stableUrl = "https://www.cryptopay.beauty";

    const apiUrl = `${stableUrl}/api/order/setBuyOrder`;
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        storecode,
        walletAddress,
        nickname,
        usdtAmount,
        krwAmount,
        rate,
        privateSale,
        buyer
      }),
    });



    if (!response.ok) {
      
      console.error("Failed to insert buy order:", response.status, response.statusText);
      console.error("Response body:", await response.text());

      
      //const errorData = await response.json();


      return NextResponse.json({
        result: null,
        error: `Failed to insert buy order: ${response.status} ${response.statusText}`,
      }, { status: response.status });
      

    }

    const result = await response.json();
    console.log("setBuyOrder =====  result", result);

    /*
    {
      result: {
        _id: '6843c74d7861b46551a752f2',
        walletAddress: '0x42bFaD5BC8B3469B57604Ef72b92d0fa218E60dC'
      }
    }
    */


    return NextResponse.json({
      result: result.result,
    });


  } catch (error) {
    console.error("Error in setBuyOrder:", error);
    return NextResponse.json({
      result: null,
      error: "Failed to insert buy order",
    }, { status: 500 });
  }


  
}
