import prisma from "@/libs/prisma";
import { getServerSession } from "next-auth";
import { authOption } from "@/libs/auth-libs";

export async function POST(req) {
  const session = await getServerSession(authOption);

  if (!session) return Response.json({ error: "Unauthorized" });

  const { comment_id } = await req.json();

  const existing = await prisma.commentLike.findUnique({
    where: {
      comment_id_user_email: {
        comment_id,
        user_email: session.user.email,
      },
    },
  });

  if (existing) {
    await prisma.commentLike.delete({
      where: { id: existing.id },
    });
  } else {
    await prisma.commentLike.create({
      data: {
        comment_id,
        user_email: session.user.email,
      },
    });
  }

  return Response.json({ success: true });
}
