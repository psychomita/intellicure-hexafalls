import { createTextReport } from "@/actions/other";
import { getServerSession } from "@/lib/session";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  const session = await getServerSession();

  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const report = await createTextReport(session.user.id, body);
  return NextResponse.json(report);
}
