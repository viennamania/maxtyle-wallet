import { NextResponse, type NextRequest } from "next/server";

import {
    createNotice,
} from '@lib/api/notice';

export async function POST(request: NextRequest) {

    const data = await request.json();

    if (!data.title || !data.content) {
        return NextResponse.json({ success: false, message: "Title and content are required." }, { status: 400 });
    }

    const result = await createNotice(data);

    if (result.success) {
        return NextResponse.json({ success: true, noticeId: result.noticeId });
    } else {
        return NextResponse.json({ success: false, message: result.message }, { status: 500 });
    }
}
