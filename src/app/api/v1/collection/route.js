import prisma from "@/libs/prisma";
import { getServerSession } from "next-auth";
import { authOption } from "@/libs/auth-libs";

/* ================= GET ================= */
export async function GET() {
  const session = await getServerSession(authOption);
  if (!session)
    return Response.json({ error: "Unauthorized" }, { status: 401 });

  const collections = await prisma.collection.findMany({
    where: { user_email: session.user.email },
    orderBy: { createdAt: "desc" },
  });

  return Response.json(collections);
}

/* ================= POST ================= */
export async function POST(request) {
  const session = await getServerSession(authOption);
  if (!session)
    return Response.json({ error: "Unauthorized" }, { status: 401 });

  const { anime_mal_id, title, image } = await request.json();

  if (!anime_mal_id || !title)
    return Response.json({ error: "Invalid Data" }, { status: 400 });

  await prisma.collection.create({
    data: {
      anime_mal_id: String(anime_mal_id),
      user_email: session.user.email,
      title,
      image,

      // 🔥 paksa simpan WIB
      createdAt: new Date(Date.now() + 7 * 60 * 60 * 1000),
    },
  });

  return Response.json({ success: true });
}

/* ================= DELETE ONE ================= */
export async function DELETE(request) {
  const session = await getServerSession(authOption);
  if (!session)
    return Response.json({ error: "Unauthorized" }, { status: 401 });

  const { anime_mal_id } = await request.json();

  await prisma.collection.deleteMany({
    where: {
      anime_mal_id: String(anime_mal_id),
      user_email: session.user.email,
    },
  });

  return Response.json({ success: true });
}

/* ================= CLEAR ALL ================= */
export async function PUT() {
  const session = await getServerSession(authOption);
  if (!session)
    return Response.json({ error: "Unauthorized" }, { status: 401 });

  await prisma.collection.deleteMany({
    where: { user_email: session.user.email },
  });

  return Response.json({ success: true });
}
