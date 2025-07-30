import { NextResponse, type NextRequest } from "next/server";



export async function POST(request: NextRequest) {

  const body = await request.json();

  const {
    clientid,
    storecode,
  } = body;


  const stableUrl = "https://www.cryptopay.beauty";

  // call api
  const apiUrl = `${stableUrl}/api/store/getOneStore`;
  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        storecode,
      }),
    });
    const data = await response.json();

    //console.log("API response:", data);

    return NextResponse.json({
      result: data.result,
    });

  } catch (error) {
    console.error("Error fetching store details:", error);
    return NextResponse.json({ error: "Failed to fetch store details" }, { status: 500 });
  }
  
}
