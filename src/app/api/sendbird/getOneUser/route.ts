import { NextResponse, type NextRequest } from "next/server";




export async function POST(request: NextRequest) {

  const body = await request.json();

  const {
    walletAddress,
  } = body;

  // GET https://api-{application_id}.sendbird.com/v3/users/{user_id}?include_unread_count=true

  
  /*
  Status: 400 Bad Request
  {
    "message": "\"User\" not found.",
    "code": 400201,
    "error": true
  }
  */


  const user_id = walletAddress;
  
  if (!user_id) {
    return NextResponse.json(
      { error: "User ID is required" },
      { status: 400 }
    );
  }


  const url = `https://api-${process.env.SENDBIRD_APPLICATION_ID}.sendbird.com/v3/users/${user_id}?include_unread_count=true`;

  console.log("Fetching user from Sendbird:", url);

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Api-Token': process.env.SENDBIRD_API_TOKEN || '',
    },
  });

  // check if the response  status 400
  if (response.status === 400) {
    const errorData = await response.json();
    console.error("Error fetching user:", errorData);
    return NextResponse.json(
      { error: errorData.message || 'Failed to fetch user' },
      { status: response.status }
    );
  } else if (!response.ok) {
    console.error("Error fetching user:", response.statusText);
    return NextResponse.json(
      { error: 'Failed to fetch user' },
      { status: response.status }
    );
  }


  const data = await response.json();

  console.log("Fetched user:", data);


  return NextResponse.json({
    result: {
      user: data,
    }
  });
  
}
