import { NextResponse, type NextRequest } from "next/server";




export async function POST(request: NextRequest) {

  const body = await request.json();

  const {
    walletAddress,
    limit,
    pageToken,
    center,
    searchNickname,
  } = body;


  // GET https://api-{application_id}.sendbird.com/v3/users

  // ?token=YXYWRFBTQlArEUBXWFNeF2p2FEFdUA~~&limit=3&metadatakey=font_color&metadatavalues_in=black
  /*
  Parameter name
Type
Description
token

string

Specifies a page token that indicates the starting index of results to retrieve. If not specified, the index is set to 0.

limit

int

Specifies the number of results to return per page. Acceptable values are 1 to 100, inclusive. (Default: 10)

active_mode

string

Specifies the activation status of the users in the list. Acceptable values are activated, deactivated, and all. (Default: activated)

show_bot

boolean

Determines whether to include bots in the list. (Default: true)

user_ids

string

Specifies the user IDs. The value should be a comma-separated string that consists of multiple urlencoded user IDs. An example of a urlencoded string is ?user_ids=urlencoded_id_1,urlencoded_id_2.

* The maximum number of user IDs in this parameter is 250. If you exceed the maximum number, your request may receive an 
HTTP 414 error
 indicating that the request URL is longer than what Sendbird server can interpret.

nickname

string

Specifies the nickname of the user. Urlencoding the value is recommended.

nickname_startswith

string

Specifies the starting characters of the nicknames to look for. When specified, the API request searches for users whose nicknames start with the specified value. Urlencoding the value is recommended.

metadatakey

string

Specifies a keyword to search for. The keyword acts as a filter to search for users with metadata containing the keyword as a key. This parameter should be specified in conjunction with the metadatavalues_in parameter below.

metadatavalues_in

string

Searches for blocked users with metadata containing an item with the key specified by the metadatakey parameter above, and the value of that item matches one or more values specified by this parameter. The string should be specified with multiple urlencoded metadata values separated by commas (for example, ?metadatavalues_in=urlencoded_value_1, urlencoded_value_2). This parameter should be specified in conjunction with the metadatakey above.
*/
  /*
  {
    "users": [
        {
            "user_id": "Craig",
            "nickname": "Shopperholic",
            "profile_url": "https://sendbird.com/main/img/profiles/profile_06_512px.png",
            "is_active": true,
            "is_online": true,
            "created_at": 1542123432,
            "last_seen_at": 0,
            "has_ever_logged_in": true,
            "metadata": {
                "font_preference": "times new roman",
                "font_color": "black"
            }
        },
        {
            "user_id": "Doris",
            "nickname": "Dojung",
            "profile_url": "https://sendbird.com/main/img/profiles/profile_05_512px.png",
            "is_active": true,
            "is_online": false,
            "created_at": 1540285244,
            "last_seen_at": 1540285396142,
            "has_ever_logged_in": true,
            "metadata": {
                "font_preference": "times new roman",
                "font_color": "black"
            }
        },
        {
            "user_id": "Young",
            "nickname": "Sportsman",
            "profile_url": "https://sendbird.com/main/img/profiles/profile_07_512px.png",
            "is_active": true,
            "is_online": true,
            "created_at": 1502403479,
            "last_seen_at": 0,
            "has_ever_logged_in": true,
            "metadata": {
                "font_preference": "times new roman",
                "font_color": "black"
            }
        }
    ],
    "next": "YXEZR1VVQVErEUBXWFNeF2p3FkFVVA~~"
    }
    */


  var url = "";
  
  if (pageToken) {
    url = `https://api-${process.env.SENDBIRD_APPLICATION_ID}.sendbird.com/v3/users?token=${pageToken}&limit=${limit}`;
  } else {
    url = `https://api-${process.env.SENDBIRD_APPLICATION_ID}.sendbird.com/v3/users?limit=${limit}`;
  }

  console.log("Fetching users from Sendbird:", url);

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Api-Token': process.env.SENDBIRD_API_TOKEN || '',
    },
  });

  if (!response.ok) {
    console.error("Error fetching users:", response.statusText);
    return NextResponse.json(
      { error: 'Failed to fetch users' },
      { status: response.status }
    );
  }

  const data = await response.json();
  console.log("Fetched users:", data);

  return NextResponse.json({
    result: {
      users: data.users,
      next: data.next,
    }
  });
  
}
