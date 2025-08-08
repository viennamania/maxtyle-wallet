import { NextResponse, type NextRequest } from "next/server";

import {
    getNotices,
} from '@lib/api/notice';

export async function GET(request: NextRequest) {
    const result = await getNotices();

    if (result.success) {
        return NextResponse.json({ success: true, notices: result.notices });
    } else {
        return NextResponse.json({ success: false, message: result.message }, { status: 500 });
    }
}
