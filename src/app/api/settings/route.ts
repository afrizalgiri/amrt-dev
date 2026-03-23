import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// GET: Fetch site settings
export async function GET() {
  let config = await prisma.siteConfig.findFirst();
  if (!config) {
    config = await prisma.siteConfig.create({ data: {} });
  }
  return NextResponse.json(config);
}

// PUT: Update site settings (admin only)
export async function PUT(request: NextRequest) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  let config = await prisma.siteConfig.findFirst();

  if (!config) {
    config = await prisma.siteConfig.create({ data: body });
  } else {
    config = await prisma.siteConfig.update({
      where: { id: config.id },
      data: body,
    });
  }

  return NextResponse.json(config);
}
