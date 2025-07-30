import { NextResponse, type NextRequest } from "next/server";




export async function POST(request: NextRequest) {

  const body = await request.json();

  const {
    walletAddress,
    nickname,
    profileUrl,
    issueAccessToken = true,
  } = body;

  // POST https://api-{application_id}.sendbird.com/v3/users
  /*
  {
    "user_id": "Jacob",
    "nickname": "Asty",
    "profile_url": "https://sendbird.com/main/img/profiles/profile_05_512px.png",
    "issue_access_token": true,
    "metadata": {
        "font_preference": "times new roman",
        "font_color": "black"
    }
  }
  */



  const user_id = walletAddress;
  
  if (!user_id || !nickname) {
    return NextResponse.json(
      { error: "User ID is required" },
      { status: 400 }
    );
  }


  const url = `https://api-${process.env.SENDBIRD_APPLICATION_ID}.sendbird.com/v3/users`;

  console.log("Fetching user from Sendbird:", url);

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Api-Token': process.env.SENDBIRD_API_TOKEN || '',
    },
    body: JSON.stringify({
      user_id: user_id,
      nickname: nickname,
      profile_url: profileUrl,
      issue_access_token: issueAccessToken,
      metadata: {
        font_preference: "times new roman",
        font_color: "black",
      },
    }),
  });

  if (!response.ok) {
    console.error("Error creating user:", response.statusText);
    return NextResponse.json(
      { error: 'Failed to create user' },
      { status: response.status }
    );
  }

  const data = await response.json();
  console.log("Created user:", data);
  return NextResponse.json({
    result: {
      user: data,
    }
  });
  
  
}
