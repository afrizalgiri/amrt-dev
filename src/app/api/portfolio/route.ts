import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// GET: Fetch portfolios (public: only published, admin: all)
export async function GET(request: NextRequest) {
  const session = await auth();
  const isAdmin = !!session?.user;

  const searchParams = request.nextUrl.searchParams;
  const all = searchParams.get("all") === "true";

  const portfolios = await prisma.portfolio.findMany({
    where: isAdmin && all ? {} : { published: true },
    orderBy: { order: "asc" },
  });

  return NextResponse.json(portfolios);
}

// POST: Create portfolio (admin only)
export async function POST(request: NextRequest) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { title, description, imageUrl, category, techStack, liveUrl, order, published } = body;

  const portfolio = await prisma.portfolio.create({
    data: {
      title,
      description,
      imageUrl: imageUrl || "",
      category,
      techStack: techStack || "",
      liveUrl: liveUrl || "",
      order: order || 0,
      published: published !== undefined ? published : true,
    },
  });

  return NextResponse.json(portfolio, { status: 201 });
}

// PUT: Update portfolio (admin only)
export async function PUT(request: NextRequest) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { id, ...data } = body;

  if (!id) {
    return NextResponse.json({ error: "ID is required" }, { status: 400 });
  }

  const portfolio = await prisma.portfolio.update({
    where: { id },
    data,
  });

  return NextResponse.json(portfolio);
}

// DELETE: Delete portfolio (admin only)
export async function DELETE(request: NextRequest) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = request.nextUrl;
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "ID is required" }, { status: 400 });
  }

  await prisma.portfolio.delete({
    where: { id },
  });

  return NextResponse.json({ success: true });
}
