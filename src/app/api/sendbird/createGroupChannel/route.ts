import { NextResponse, type NextRequest } from "next/server";




export async function POST(request: NextRequest) {

  try {
    const body = await request.json();

    const {
      user_id1,
      user_id2,
    } = body;

    if (!user_id1 || !user_id2) {

      console.error("Missing user IDs:", user_id1, user_id2);

      return NextResponse.json(
        { error: 'Missing user IDs' },
        { status: 400 }
      );
    }

    // Check if environment variables are set
    if (!process.env.SENDBIRD_APPLICATION_ID || !process.env.SENDBIRD_API_TOKEN) {
      console.error("Missing Sendbird environment variables");
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      );
    }

  const urlUser1 = `https://api-${process.env.SENDBIRD_APPLICATION_ID}.sendbird.com/v3/users/${user_id1}?include_unread_count=true`;

  const responseUser1 = await fetch(urlUser1, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Api-Token': process.env.SENDBIRD_API_TOKEN || '',
    },
  });

  if (!responseUser1.ok) {
    console.error("Error fetching user 1:", responseUser1.statusText);
    return NextResponse.json(
      { error: 'Failed to fetch user 1' },
      { status: responseUser1.status }
    );
  }
  const dataUser1 = await responseUser1.json();
  console.log("Fetched user 1 data:", dataUser1);

  const urlUser2 = `https://api-${process.env.SENDBIRD_APPLICATION_ID}.sendbird.com/v3/users/${user_id2}?include_unread_count=true`;
  const responseUser2 = await fetch(urlUser2, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Api-Token': process.env.SENDBIRD_API_TOKEN || '',
    },
  });
  if (!responseUser2.ok) {
    console.error("Error fetching user 2:", responseUser2.statusText);
    return NextResponse.json(
      { error: 'Failed to fetch user 2' },
      { status: responseUser2.status }
    );
  }
  const dataUser2 = await responseUser2.json();
  console.log("Fetched user 2 data:", dataUser2);

  // Safely get nicknames with fallbacks
  const nickname1 = dataUser1?.nickname || user_id1;
  const nickname2 = dataUser2?.nickname || user_id2;





  // delete sendbird_group_channel_277400202_3255a1af1013aa5b417a98c531f6dd33f71f1211

  // DELETE https://api-{application_id}.sendbird.com/v3/group_channels/{channel_url}
  
  const delete_channel_url = 'sendbird_group_channel_277424115_456bae621f5d561dfccc0acda8b6453dd5c12a14';

  const deleteApiUrl = `https://api-${process.env.SENDBIRD_APPLICATION_ID}.sendbird.com/v3/group_channels/${delete_channel_url}`;
  const deleteResponse = await fetch(deleteApiUrl, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Api-Token': process.env.SENDBIRD_API_TOKEN || '',
    },
  });

  console.log("Delete channel response status:", deleteResponse.status);
  




  /*
  Error response body: {"error":true,"message":"Invalid value: \"is_distinct. If you want this value to be set \"true\", is_public must not be true.\".","code":400111}
  */


  const url = `https://api-${process.env.SENDBIRD_APPLICATION_ID}.sendbird.com/v3/group_channels`;

  console.log("Creating group channel with URL:", url);

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Api-Token': process.env.SENDBIRD_API_TOKEN || '',
    },
    body: JSON.stringify({
      
      user_ids: [user_id1, user_id2],
      //users: [dataUser1, dataUser2],

      //operator_ids: [user_id1, user_id2],

      
      //name: `${dataUser1.nickname} 와 ${dataUser2.nickname}의 채널`,
      name: `${nickname1} - ${nickname2}`,

      is_distinct: true,

      custom_type: 'personal',

      ///is_public: true,

      //cover_url: 'https://gold.goodtether.com/icon-trade.png',
      //custom_type: 'trade',

    }),
  });

  if (!response.ok) {
    console.error("Error creating group channel:", response.statusText);
    const errorText = await response.text();
    console.error("Error response body:", errorText);
    return NextResponse.json(
      { error: 'Failed to create group channel', details: errorText },
      { status: response.status }
    );
  }

  const data = await response.json();

  console.log("Created group channel data:", data);




  /*
  {
    channel_url: 'sendbird_group_channel_277400202_3255a1af1013aa5b417a98c531f6dd33f71f1211',
    name: 'wayne 와 genie의 채널',
    cover_url: 'https://static.sendbird.com/sample/cover/cover_11.jpg',
    data: '',
    member_count: 2,
    joined_member_count: 2,
    max_length_message: 5000,
    created_at: 1752732189,
    custom_type: '',
    is_distinct: true,
    is_super: false,
    is_broadcast: false,
    is_public: false,
    is_discoverable: false,
    freeze: false,
    is_ephemeral: false,
    unread_message_count: 0,
    unread_mention_count: 0,
    ignore_profanity_filter: false,
    has_ai_bot: false,
    has_bot: false,
    is_desk_channel: false,
    is_ai_agent_channel: false,
    id: 166950032,
    channel: {
      channel_url: 'sendbird_group_channel_277400202_3255a1af1013aa5b417a98c531f6dd33f71f1211',
      name: 'wayne 와 genie의 채널',
      cover_url: 'https://static.sendbird.com/sample/cover/cover_11.jpg',
      data: '',
      created_at: 1752732189,
      custom_type: '',
      max_length_message: 5000,
      member_count: 2
    },
    created_by: null,
    disappearing_message: { is_triggered_by_message_read: false, message_survival_seconds: -1 },
    is_access_code_required: false,
    is_created: false,
    message_survival_seconds: -1,
    sms_fallback: { wait_seconds: -1, exclude_user_ids: [] },
    last_message: null,
    members: [
      {
        user_id: '0x86722e6b5a13EC03c7Fd1e1decfadc846b0929f0',
        nickname: 'genie',
        profile_url: '/profile-default.png',
        require_auth_for_profile_image: false,
        metadata: [Object],
        is_online: false,
        last_seen_at: -1,
        state: 'joined',
        is_active: true,
        role: '',
        is_muted: false,
        muted_end_at: -1,
        muted_description: ''
      },
      {
        user_id: '0xDEe1E6E4F4b6eE8b9b11458D100DB990082ac787',
        nickname: 'wayne',
        profile_url: '/profile-default.png',
        require_auth_for_profile_image: false,
        metadata: [Object],
        is_online: false,
        last_seen_at: -1,
        state: 'joined',
        is_active: true,
        role: '',
        is_muted: false,
        muted_end_at: -1,
        muted_description: ''
      }
    ],
    operators: []
  }
  */



 




  const channel_url = data.channel_url;

  console.log("Created group channel channel_url:", channel_url);



  /*
  // join a channel
  // PUT https://api-{application_id}.sendbird.com/v3/group_channels/{channel_url}/join

  const joinUrl = `https://api-${process.env.SENDBIRD_APPLICATION_ID}.sendbird.com/v3/group_channels/${channel_url}/join`;
  const joinResponse = await fetch(joinUrl, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Api-Token': process.env.SENDBIRD_API_TOKEN || '',
    },
    body: JSON.stringify({
      user_id: user_id1, // Assuming user_id1 is the one joining
    }),
  });

  if (!joinResponse.ok) {
    console.error("Error joining group channel:", joinResponse.statusText);
    return NextResponse.json(
      { error: 'Failed to join group channel', details: await joinResponse.text() },
      { status: joinResponse.status }
    );
  }
  console.log("User joined group channel successfully");
  */
  








  return NextResponse.json({
    result: {
      channel_url: channel_url,
    }
  });

  } catch (error) {
    console.error("Unexpected error in createGroupChannel:", error);
    return NextResponse.json(
      { error: 'Internal server error', details: String(error) },
      { status: 500 }
    );
  }
  
}
