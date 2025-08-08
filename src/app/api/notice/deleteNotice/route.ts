import { NextResponse, type NextRequest } from "next/server";

import {
    deleteNotice,
} from '@lib/api/notice';

export async function POST(req: NextRequest) {
    const { objectId } = await req.json();
    const result = await deleteNotice(objectId);
    return NextResponse.json(result);
}