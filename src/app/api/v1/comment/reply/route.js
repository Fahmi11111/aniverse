import prisma from "@/libs/prisma";
import { getServerSession } from "next-auth";
import { authOption } from "@/libs/auth-libs";

export async function POST(req) {
  const session = await getServerSession(authOption);

  if (!session) return Response.json({ error: "Unauthorized" });

  const { comment_id, reply } = await req.json();

  const newReply = await prisma.commentReply.create({
    data: {
      comment_id,
      user_email: session.user.email,
      username: session.user.name,
      reply,
    },
  });

  return Response.json(newReply);
}
